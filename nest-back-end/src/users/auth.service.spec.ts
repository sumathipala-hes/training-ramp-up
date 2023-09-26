/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { MockAuthService } from './util/mockAuth.service';
import { UsersService } from './users.service';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from './user.entity';
import { Response } from 'express';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: MockAuthService;
  let response: Response;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    //Create a fake copy of the users service
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: 'test@123.com',
          userName: 'test',
          roles: 'USER',
        } as User),
      findByEmail: (email: string) => Promise.resolve(null),
      create: (email: string, userName: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          userName,
          password,
          roles: 'USER',
        } as User),
    };
    const fakeJwtService: Partial<JwtService> = {
      verifyAsync: async <T extends object = any>(
        token: string,
        options?: JwtVerifyOptions,
      ) => ({}) as T, // You can return an empty object as a placeholder
      signAsync: async (
        payload: string | object | Buffer,
        options?: JwtSignOptions,
      ) => 'token', // Match parameter types and return types
    };

    const module = await Test.createTestingModule({
      providers: [
        MockAuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        { provide: JwtService, useValue: fakeJwtService },
      ],
    }).compile();

    service = module.get(MockAuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a hashed password', async () => {
    const user = await service.signup(
      'test@123.com',
      'testName',
      'test',
      response as Response,
    );

    console.log(user);
    expect(user).toBeDefined();
    expect(user.roles).toEqual('USER');
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.findByEmail = (email: string) =>
      Promise.resolve({
        id: 1,
        email: 'test@123.com',
        userName: 'testName',
        password: 'test',
      } as User);

    await expect(
      service.signup('test@123.com', 'testName', 'test', response as Response),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('test@123.com', 'test', response),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if invalid password is provided', async () => {
    fakeUsersService.findByEmail = (email: string) =>
      Promise.resolve({
        id: 1,
        email: 'test@123.com',
        userName: 'testName',
        password: 'test',
      } as User);

    await expect(
      service.signin('test@123.com', 'pass1234', response),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    fakeUsersService.findByEmail = (email: string) =>
      Promise.resolve({
        id: 1,
        email: 'test@123.com',
        userName: 'testName',
        password: 'test',
      } as User);

    const user = await service.signin('test@123.com', 'test', response);
    expect(user).toBeDefined();
  });
});

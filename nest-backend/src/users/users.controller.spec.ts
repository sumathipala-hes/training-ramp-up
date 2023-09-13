import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { encrypt } from '../utils/password.util';
import { Response } from 'express';

jest.mock('../utils/password.util', () => ({
  encrypt: jest.fn().mockReturnValue('encrypted'),
  decrypt: jest.fn().mockReturnValue('decrypted'),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            login: jest.fn(),
            signOut: jest.fn(),
            encrypt: jest.fn(),
            decrypt: jest.fn(),
          },
        },
        AuthService,
        JwtService,
      ],
    })
      .useMocker(() =>
        jest.mock('../utils/password.util', () => ({
          encrypt: jest.fn().mockReturnValue('encrypted'),
          decrypt: jest.fn().mockReturnValue('decrypted'),
        })),
      )
      .compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('create user', () => {
    const result: User = {
      name: 'Dasun',
      email: 'dasun@gmail.com',
      password: '123456',
      role: 'admin',
    };
    const insertResult = {
      identifiers: [result],
      generatedMaps: [result],
      raw: result,
    };
    it('create user success', async () => {
      userService.create = jest.fn().mockResolvedValue(insertResult);
      expect(await controller.create(result)).toEqual(insertResult);
    });
    it('create user fail', async () => {
      userService.create = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(controller.create(result)).rejects.toThrowError('Error');
    });
  });

  describe('find all users', () => {
    const result: User[] = [
      {
        name: 'Dasun',
        email: 'dasun@gmail.com',
        password: '123456',
        role: 'admin',
      },
    ];
    it('find all users success', async () => {
      userService.findAll = jest.fn().mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
    it('find all users fail', async () => {
      userService.findAll = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(controller.findAll()).rejects.toThrowError('Error');
    });
  });

  describe('update user', () => {
    const result: User = {
      name: 'Dasun',
      email: 'dasun@gmail.com',
      password: '123456',
      role: 'admin',
    };
    it('update user success', async () => {
      userService.update = jest.fn().mockResolvedValue(result);
      expect(await controller.update('dasun@gmail.com', result)).toEqual(
        result,
      );
    });
    it('update user fail', async () => {
      userService.update = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(
        controller.update('dasun@gmail.com', result),
      ).rejects.toThrowError('Error');
    });
  });

  describe('remove user', () => {
    const result: User = {
      name: 'Dasun',
      email: 'dasun@gmail.com',
      password: '123456',
      role: 'admin',
    };
    it('remove user success', async () => {
      userService.remove = jest.fn().mockResolvedValue(result);
      expect(await controller.remove('dasun@gmail.com')).toEqual(result);
    });
    it('remove user fail', async () => {
      userService.remove = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(controller.remove('dasun@gmail.com')).rejects.toThrowError(
        'Error',
      );
    });
  });

  describe('Sign In', () => {
    const result: CreateUserDto = {
      name: 'Dasun',
      email: 'dasun@gmail.com',
      password: encrypt('1234'),
      role: 'admin',
    };

    const req = {
      body: {
        username: 'rashi',
        password: '123456',
      },
    };
    const createMockResponse = (): Response => {
      const res: Response = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.cookie = jest.fn().mockReturnValue(res);

      return res;
    };
    test('Sign In User Success', async () => {
      authService.signIn = jest.fn().mockResolvedValue(result);
      const data = await controller.login(result, createMockResponse());
      expect(typeof data).toEqual('undefined');
    });

    test('Sign In User Fail', async () => {
      authService.signIn = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(
        controller.login(result, Object as any),
      ).rejects.toThrowError('Error');
    });
  });
});

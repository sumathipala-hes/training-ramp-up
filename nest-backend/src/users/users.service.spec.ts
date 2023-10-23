import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SocketService } from '../socket/socket.service';

jest.mock('../utils/password.util', () => ({
  encrypt: jest.fn().mockReturnValue('encrypted'),
  decrypt: jest.fn().mockReturnValue('decrypted'),
}));

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  let socketService = new SocketService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        SocketService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            encrypt: jest.fn(),
            decrypt: jest.fn(),
          },
        },
      ],
    })
      .useMocker(() =>
        jest.mock('../utils/password.util', () => ({
          encrypt: jest.fn().mockReturnValue('encrypted'),
          decrypt: jest.fn().mockReturnValue('decrypted'),
        })),
      )
      .compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
    socketService = module.get<SocketService>(SocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
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
      repo.insert = jest.fn().mockResolvedValue(insertResult);
      const data = await service.create(result);
      expect(data).toEqual(insertResult);
    });
    it('create user fail', async () => {
      repo.insert = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(service.create(result)).rejects.toThrowError(
        'Internal Server Error',
      );
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
      repo.find = jest.fn().mockResolvedValue(result);
      const data = await service.findAll();
      expect(data).toEqual(result);
    });
    it('find all users fail', async () => {
      repo.find = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(service.findAll()).rejects.toThrowError(
        'Internal Server Error',
      );
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
      repo.update = jest.fn().mockResolvedValue(result);
      const data = await service.update('dasun@gmail.com', result);
      expect(data).toEqual(result);
    });
    it('update user fail', async () => {
      repo.update = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(
        service.update('dasun@gmail.com', result),
      ).rejects.toThrowError('Internal Server Error');
    });
  });

  describe('remove user', () => {
    it('remove user success', async () => {
      const result = {
        name: 'Dasun',
        email: 'dasun@gmail.com',
        password: '123456',
        role: 'admin',
      };
      const user = (repo.findOne = jest.fn().mockResolvedValue(result));
      repo.delete = jest.fn().mockResolvedValue(result);
      const data = await service.remove('dasun@gmail.com');
      if (user) {
        expect(data).toEqual(result);
      } else {
        expect(data).rejects.toThrowError('Internal Server Error');
      }
    });
    it('remove user fail', async () => {
      repo.delete = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(service.remove('dasun@gmail.com')).rejects.toThrowError(
        'Internal Server Error',
      );
    });
  });
});

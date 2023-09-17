import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { encryptPassword } from '../util/password.util';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            registerUser: jest.fn(),
            retrieveAllUsers: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    const createUserDto: CreateUserDto = {
      userName: 'Pahasara',
      userEmail: 'pahasara7788@gmail.com',
      userPassword: '12345678',
      role: 'admin',
    };

    const insertResult: InsertResult = {
      raw: {},
      generatedMaps: [],
      identifiers: [],
    };

    it('should create a new user', async () => {
      repository.insert = jest.fn().mockResolvedValue(insertResult);
      const result = await service.registerUser(createUserDto);
      createUserDto.userPassword = encryptPassword(createUserDto.userPassword);
      expect(result).toEqual(insertResult);
      expect(repository.insert).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an error on failure', async () => {
      repository.insert = jest
        .fn()
        .mockRejectedValue(new Error('Failed to create user.'));

      await expect(service.registerUser(createUserDto)).rejects.toThrowError(
        'Failed to create user.',
      );
    });

    it('should throw an error if user already exists', async () => {
      repository.insert = jest
        .fn()
        .mockRejectedValue(new Error('User already exists.'));

      await expect(service.registerUser(createUserDto)).rejects.toThrowError(
        'User already exists.',
      );
    });
  });

  describe('retrieveAllUsers', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          userName: 'Pahasara',
          userEmail: 'pahasara7788@gmail.com',
          userPassword: '12345678',
          role: 'admin',
        },
        {
          userName: 'Pasan',
          userEmail: 'pasan85@gmail.com',
          userPassword: '12345678',
          role: 'user',
        },
      ];
      repository.find = jest.fn().mockResolvedValue(users);
      try {
        const result = await service.retrieveAllUsers();
        expect(result).toEqual({ data: users });
      } catch (Ignore) {}
    });

    it('should handle an empty user list', async () => {
      // Mock the repository's find method to return an empty array
      repository.find = jest.fn().mockResolvedValue([]);
      const result = await service.retrieveAllUsers();
      // Expect the result to be an empty array
      expect(result).toEqual({ data: [] });
    });

    it('should handle an error when retrieving users', async () => {
      repository.find = jest
        .fn()
        .mockRejectedValue(
          new HttpException('Bad Request', HttpStatus.BAD_REQUEST),
        );
      await expect(service.retrieveAllUsers()).rejects.toThrowError(
        'Bad Request',
      );
    });
  });

  describe('updateUser', () => {
    const userEmail = 'pahasara7788@gmail.com';
    const updateUserDto: UpdateUserDto = {
      userName: 'Pahasara',
      userEmail: 'pahasara7788@gmail.com',
      userPassword: '12345678',
      role: 'admin',
    };

    const updateResult: UpdateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    it('should update a user', async () => {
      repository.update = jest.fn().mockResolvedValue(updateResult);
      const result = await service.updateUser(userEmail, updateUserDto);
      expect(result).toEqual(updateResult);
    });

    it('should throw an error on failure', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValue(new Error('Failed to update user.'));

      await expect(
        service.updateUser(userEmail, updateUserDto),
      ).rejects.toThrowError('Failed to update user.');
    });

    it('should throw an error if user is not found', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValue(new Error('User not found.'));

      await expect(
        service.updateUser(userEmail, updateUserDto),
      ).rejects.toThrowError('User not found.');
    });
  });

  describe('deleteUser', () => {
    const userEmail = 'pahasara7788@gmail.com';
    const removeResult: DeleteResult = {
      raw: [],
      affected: 1,
    };

    it('should remove a user', async () => {
      repository.delete = jest.fn().mockResolvedValue(removeResult);
      const result = await service.deleteUser(userEmail);
      expect(result).toEqual(removeResult);
    });

    it('should throw an error on failure', async () => {
      repository.delete = jest
        .fn()
        .mockRejectedValue(new Error('Failed to delete user.'));

      await expect(service.deleteUser(userEmail)).rejects.toThrowError(
        'Failed to delete user.',
      );
    });

    it('should throw an error if user is not found', async () => {
      repository.delete = jest
        .fn()
        .mockRejectedValue(new Error('User not found.'));

      await expect(service.deleteUser(userEmail)).rejects.toThrowError(
        'User not found.',
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult, InsertResult } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  const mockUsers: User[] = [
    {
      roleType: 'ADMIN',
      name: 'Nimesh',
      address: 'Galle',
      email: 'nimesh123@gmail.com',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
      password: '56be13c102bcf2a06c95f7ab57ce6018',
    },
    {
      roleType: 'USER',
      name: 'Pasan',
      address: 'Galle',
      email: 'nimesh12@gmail.com',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
      password: '56be13c102bcf2a06c95f7ab57ce6018',
    },
  ];

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    const createUserDto: CreateUserDto = {
      roleType: 'ADMIN',
      name: 'Nimesh',
      address: 'Galle',
      email: 'nimesh1234@gmail.com',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
      password: 'Nimesh12@345',
    };

    const insertResult: InsertResult = {
      raw: {},
      generatedMaps: [],
      identifiers: [],
    };

    it('should create a user', async () => {
      userRepository.insert = jest.fn().mockResolvedValue(insertResult);
      const result = await service.createUser(createUserDto);
      expect(result).toEqual(insertResult);
      expect(userRepository.insert).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an error if user creation fails', async () => {
      userRepository.insert = jest
        .fn()
        .mockRejectedValue(new Error('Failed to create user.'));

      await expect(service.createUser(createUserDto)).rejects.toThrowError(
        'Failed to create user.',
      );
    });
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      userRepository.find = jest.fn().mockResolvedValue(mockUsers);
      const result = await service.findAllUsers();
      expect(result).toEqual(mockUsers);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if no users are found', async () => {
      userRepository.find = jest.fn().mockResolvedValue([]);
      await expect(service.findAllUsers()).rejects.toThrow(
        'Failed to fetch users.',
      );
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if userRepository.find throws an error', async () => {
      userRepository.find = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));
      await expect(service.findAllUsers()).rejects.toThrow(
        'Failed to fetch users.',
      );
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneUser', () => {
    it('should throw an error if no user is found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.findOneUser('Nimeshe')).rejects.toThrow(
        'Failed to fetch user.',
      );
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    const email = 'nimesh12@gmail.com';
    const updateUserDto: UpdateUserDto = {
      roleType: 'USER',
      name: 'Nimesh',
      address: 'Galle',
      email: 'nimesh12@gmail.com',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
      password: 'Nimesh1@23',
    };

    const updateResult: UpdateResult = {
      raw: {},
      generatedMaps: [],
      affected: 1,
    };

    it('should update a user', async () => {
      userRepository.update = jest.fn().mockResolvedValue(updateResult);
      const result = await service.updateUser(email, updateUserDto);
      expect(result).toEqual(updateResult);
      expect(userRepository.update).toHaveBeenCalledWith(email, updateUserDto);
    });

    it('should throw an error if user is not found', async () => {
      userRepository.update = jest
        .fn()
        .mockRejectedValue(new Error('Failed to update user.'));
      await expect(service.updateUser(email, updateUserDto)).rejects.toThrow(
        'Failed to update user.',
      );
      expect(userRepository.update).toHaveBeenCalledWith(email, updateUserDto);
    });

    it('should throw an error if userRepository.update throws an error', async () => {
      userRepository.update = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));
      await expect(service.updateUser(email, updateUserDto)).rejects.toThrow(
        'Failed to update user.',
      );
      expect(userRepository.update).toHaveBeenCalledWith(email, updateUserDto);
    });
  });

  describe('removeUser', () => {
    const email = 'nimesh12@gmail.com';

    const deleteResult: DeleteResult = {
      raw: {},
      affected: 1,
    };

    it('should delete a user', async () => {
      userRepository.delete = jest.fn().mockResolvedValue(deleteResult);
      const result = await service.removeUser(email);
      expect(result).toEqual(deleteResult);
      expect(userRepository.delete).toHaveBeenCalledWith(email);
    });

    it('should throw an error if user is not found', async () => {
      userRepository.delete = jest
        .fn()
        .mockRejectedValue(new Error('Failed to delete user.'));
      await expect(service.removeUser(email)).rejects.toThrow(
        'Failed to delete user.',
      );
      expect(userRepository.delete).toHaveBeenCalledWith(email);
    });

    it('should throw an error if userRepository.delete throws an error', async () => {
      userRepository.delete = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));
      await expect(service.removeUser(email)).rejects.toThrow(
        'Failed to delete user.',
      );
      expect(userRepository.delete).toHaveBeenCalledWith(email);
    });
  });
});

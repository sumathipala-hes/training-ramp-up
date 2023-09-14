import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseData } from './dto/response-data';

describe('UsersController', () => {
  let usersService: UsersService;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            findAllUsers: jest.fn(),
            findOneUser: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            removeUser: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const result: UserResponseData = {
        message: 'User found successfully',
        data: [
          {
            roleType: 'ADMIN',
            name: 'Nimesh',
            address: 'Galle',
            email: 'nimesh12@gmail.com',
            mobileNumber: '0761234567',
            dob: new Date('2001 - 12 - 15'),
            gender: 'Male',
            password: 'Nimesh12@345',
          },
        ],
      };

      jest.spyOn(usersService, 'findAllUsers').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should fail in student retrieval and throw an error', async () => {
      jest.spyOn(usersService, 'findAllUsers').mockRejectedValue(new Error());
      await expect(controller.findAll()).rejects.toThrowError();
    });

    it('should return an empty array if no users found', async () => {
      const result: UserResponseData = {
        message: 'User not found',
        data: [],
      };

      jest.spyOn(usersService, 'findAllUsers').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOneUser', () => {
    const search = 'Nimesh';
    it('should return a user', async () => {
      const result: UserResponseData = {
        message: 'User found successfully',
        data: [
          {
            roleType: 'ADMIN',
            name: 'Nimesh',
            address: 'Galle',
            email: 'nimesh12@gmail.com',
            mobileNumber: '0761234567',
            dob: new Date('2001 - 12 - 15'),
            gender: 'Male',
            password: 'Nimesh12@345',
          },
        ],
      };

      jest.spyOn(usersService, 'findOneUser').mockResolvedValue(result);

      expect(await controller.findOne(search)).toBe(result);
    });

    it('should fail in student retrieval and throw an error', async () => {
      jest.spyOn(usersService, 'findOneUser').mockRejectedValue(new Error());
      await expect(controller.findOne(search)).rejects.toThrowError();
    });

    it('should return an empty array if no users found', async () => {
      const result: UserResponseData = {
        message: 'User not found',
        data: [],
      };

      jest.spyOn(usersService, 'findOneUser').mockResolvedValue(result);

      expect(await controller.findOne(search)).toBe(result);
    });
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
      identifiers: [],
      generatedMaps: [],
      raw: [],
    };

    it('should create a user', async () => {
      jest.spyOn(usersService, 'createUser').mockResolvedValue(insertResult);

      await controller.create(createUserDto);

      expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(usersService.createUser).toHaveBeenCalledTimes(1);
    });

    it('should fail and throw an error if email already exists', async () => {
      jest
        .spyOn(usersService, 'createUser')
        .mockRejectedValue(new Error('Email already exists'));

      await expect(controller.create(createUserDto)).rejects.toThrow(
        'Email already exists',
      );
    });

    it('should fail in student creation and throw an error', async () => {
      jest.spyOn(usersService, 'createUser').mockRejectedValue(new Error());
      await expect(controller.create(createUserDto)).rejects.toThrow();
    });
  });

  describe('updateUser', () => {
    const email = 'nimesh12@gmail.com';
    const updatedUser: UpdateUserDto = {
      roleType: 'USER',
      name: 'Pasan',
      address: 'Galle',
      email: 'nimesh12@gmail.com',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
      password: 'Nimesh12@345',
    };

    it('should return a student', async () => {
      const updateUserResult: UpdateResult = {
        affected: 1,
        generatedMaps: [],
        raw: [],
      };

      jest
        .spyOn(usersService, 'updateUser')
        .mockResolvedValue(updateUserResult);

      await controller.update(email, updatedUser);

      expect(usersService.updateUser).toHaveBeenCalledWith(email, updatedUser);
      expect(updateUserResult).toEqual(updateUserResult);
    });

    it('should fail in student update and throw an error', async () => {
      jest.spyOn(usersService, 'updateUser').mockRejectedValue(new Error());
      await expect(
        controller.update(email, updatedUser),
      ).rejects.toThrowError();
    });

    it('should fail and throw an error if email does not exists', async () => {
      jest
        .spyOn(usersService, 'updateUser')
        .mockRejectedValue(new Error('Email does not exists'));

      await expect(controller.update(email, updatedUser)).rejects.toThrowError(
        'Email does not exists',
      );
    });
  });

  describe('removeUser', () => {
    const email = 'nimesh12@gmail.com';
    it('should delete a user and return success response', async () => {
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: [],
      };

      jest
        .spyOn(usersService, 'removeUser')
        .mockResolvedValue(mockDeleteResult);

      await controller.remove(email);

      expect(usersService.removeUser).toHaveBeenCalledWith(email);
      expect(mockDeleteResult).toEqual(mockDeleteResult);
    });

    it('should fail in student deletion and throw an error', async () => {
      jest.spyOn(usersService, 'removeUser').mockRejectedValue(new Error());
      await expect(controller.remove(email)).rejects.toThrowError();
    });

    it('should fail and throw an error if email does not exists', async () => {
      jest
        .spyOn(usersService, 'removeUser')
        .mockRejectedValue(new Error('Email does not exists'));

      await expect(controller.remove(email)).rejects.toThrowError(
        'Email does not exists',
      );
    });
  });
});

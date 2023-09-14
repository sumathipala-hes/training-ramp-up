import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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

    it('should throw an error if user already exists', async () => {
      const mockError = new Error('Error creating user');

      jest.spyOn(usersService, 'createUser').mockRejectedValue(mockError);

      await controller.create(createUserDto);

      expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(mockError.message).toEqual('Error creating user');
    });
  });

  describe('findAllUsers', () => {
    const expectedResult: User[] = [
      {
        roleType: 'ADMIN',
        name: 'Nimesh',
        address: 'Galle',
        email: 'nimesh123@gmail.com',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
        password: 'Nimesh12@345',
      },
      {
        roleType: 'USER',
        name: 'Pasan',
        address: 'Galle',
        email: 'nimesh12@gmail.com',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
        password: 'Nimesh12@345',
      },
    ];

    it('should return an array of users', async () => {
      const getAll = jest
        .spyOn(usersService, 'findAllUsers')
        .mockResolvedValue(expectedResult);

      await controller.findAll();

      getAll.mockRestore();
    });

    it('should return an error message if users not found', async () => {
      const getAll = jest
        .spyOn(usersService, 'findAllUsers')
        .mockRejectedValue(new Error('User not found'));

      await controller.findAll();

      expect(getAll).toHaveBeenCalled();

      getAll.mockRestore();
    });

    it('should return an error message if users fetch failed', async () => {
      const getAll = jest
        .spyOn(usersService, 'findAllUsers')
        .mockRejectedValue(new Error('Error finding users'));

      await controller.findAll();

      expect(getAll).toHaveBeenCalled();

      getAll.mockRestore();
    });
  });

  describe('findOneUser', () => {
    const expectedResult: User[] = [
      {
        roleType: 'ADMIN',
        name: 'Nimesh',
        address: 'Galle',
        email: 'nimesh123@gmail.com',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
        password: 'Nimesh12@345',
      },
      {
        roleType: 'USER',
        name: 'Pasan',
        address: 'Galle',
        email: 'nimesh12@gmail.com',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
        password: 'Nimesh12@345',
      },
    ];

    it('should return a user', async () => {
      const getOne = jest
        .spyOn(usersService, 'findOneUser')
        .mockResolvedValue(expectedResult[0]);

      await controller.findOne('Nimesh');

      expect(getOne).toHaveBeenCalledWith('Nimesh');
      expect(getOne).toHaveBeenCalledTimes(1);
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

    it('should handle error and return error response', async () => {
      const mockError = new Error('User not found');

      jest.spyOn(usersService, 'updateUser').mockRejectedValue(mockError);

      await controller.update(email, updatedUser);

      expect(usersService.updateUser).toHaveBeenCalledWith(email, updatedUser);
      expect(mockError.message).toEqual('User not found');
    });

    it('should handle other errors and return error response', async () => {
      const mockError = new Error('Error updating student');

      jest.spyOn(usersService, 'updateUser').mockRejectedValue(mockError);

      await controller.update(email, updatedUser);

      expect(usersService.updateUser).toHaveBeenCalledWith(email, updatedUser);
      expect(mockError.message).toEqual('Error updating student');
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

    it('should handle "User not found" error and return error response', async () => {
      const mockError = new Error('User not found');

      jest.spyOn(usersService, 'removeUser').mockRejectedValue(mockError);

      await controller.remove(email);

      expect(usersService.removeUser).toHaveBeenCalledWith(email);
      expect(mockError.message).toEqual('User not found');
    });

    it('should handle other errors and return error response', async () => {
      const mockError = new Error('Error deleting user');

      jest.spyOn(usersService, 'removeUser').mockRejectedValue(mockError);

      await controller.remove(email);

      expect(usersService.removeUser).toHaveBeenCalledWith(email);
    });
  });
});

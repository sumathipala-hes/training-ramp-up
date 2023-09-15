import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            registerUser: jest.fn(),
            retrieveAllUsers: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    const createUserDto: CreateUserDto = {
      userName: 'Pahasara',
      userEmail: 'pahasara7788@gmail.com',
      userPassword: '12345678',
      role: 'admin',
    };

    it('should return a user', async () => {
      const mockInsertResult = {
        generatedMaps: [{ userEmail: 1 }],
        raw: {},
        identifiers: [],
      };

      jest.spyOn(service, 'registerUser').mockResolvedValue(mockInsertResult);
      await controller.create(createUserDto);
      expect(service.registerUser).toHaveBeenCalledWith(createUserDto);
      expect(mockInsertResult).toEqual(mockInsertResult);
    });

    it('should fail in user creation and throw an error', async () => {
      jest.spyOn(service, 'registerUser').mockRejectedValue(new Error());
      await expect(controller.create(createUserDto)).rejects.toThrowError();
    });

    it('should fail and throw an error if user already exists', async () => {
      jest
        .spyOn(service, 'registerUser')
        .mockRejectedValue(new Error('User already exists'));
      await expect(controller.create(createUserDto)).rejects.toThrow(
        'User already exists',
      );
    });
  });

  describe('retrieveAllUsers', () => {
    const findAllResult = [
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

    it('find all users success', async () => {
      jest
        .spyOn(service, 'retrieveAllUsers')
        .mockResolvedValue(findAllResult as any);
      expect(await controller.retrieveAllUsers()).toEqual(findAllResult);
    });

    it('find all users fail', async () => {
      jest
        .spyOn(service, 'retrieveAllUsers')
        .mockRejectedValue(new Error('Error'));
      const mockController = new UserController(service); // Inject the mocked service
      await expect(mockController.retrieveAllUsers()).rejects.toThrowError(
        'Error',
      );
    });
  });

  describe('updateUser', () => {
    const userEmail= 'pahasara7788@gmail.com';
    const updateUserDto: UpdateUserDto = {
      userName: 'Pahasara',
      userEmail: 'pahasara7788@gmail.com',
      userPassword: '12345678',
      role: 'admin',
    };

    it('should return a user', async () => {
      const updateUserResult: UpdateResult = {
        affected: 1,
        generatedMaps: [],
        raw: [],
      };

      jest
        .spyOn(service, 'updateUser')
        .mockResolvedValue(updateUserResult);

      await controller.update(userEmail, updateUserDto);

      expect(service.updateUser).toHaveBeenCalledWith(
        userEmail,
        updateUserDto,
      );
      expect(updateUserResult).toEqual(updateUserResult);
    });

    it('should fail in user update and throw an error', async () => {
      jest.spyOn(service, 'updateUser').mockRejectedValue(new Error());

      await expect(
        controller.update(userEmail, updateUserDto),
      ).rejects.toThrowError();
    });

    it('should fail and throw an error if user does not exists', async () => {
      jest
        .spyOn(service, 'updateUser')
        .mockRejectedValue(new Error('User does not exists'));

      await expect(
        controller.update(userEmail, updateUserDto),
      ).rejects.toThrowError('User does not exists');
    });
  });

  describe('deleteUser', () => {
    const userEmail = 'pahasara7788@gmail.com';
    it('should delete a user and return success response', async () => {
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: [],
      };

      jest.spyOn(service, 'deleteUser').mockResolvedValue(mockDeleteResult);

      await controller.remove(userEmail);

      expect(service.deleteUser).toHaveBeenCalledWith(userEmail);
      expect(mockDeleteResult).toEqual(mockDeleteResult);
    });

    it('should fail in user deletion and throw an error', async () => {
      jest.spyOn(service, 'deleteUser').mockRejectedValue(new Error());

      await expect(controller.remove(userEmail)).rejects.toThrowError();
    });

    it('should fail and throw an error if user does not exists', async () => {
      jest
        .spyOn(service, 'deleteUser')
        .mockRejectedValue(new Error('User does not exists'));

      await expect(controller.remove(userEmail)).rejects.toThrowError(
        'User does not exists',
      );
    });
  });
});

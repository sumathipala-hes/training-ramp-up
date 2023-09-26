import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { mockUser } from 'src/utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

interface RequestType {
  cookies: { token: string; refreshToken: string };
}

interface loginType {
  body: { username: string; password: string };
}

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            insert: () => {
              return jest.fn();
            },
            findOneBy: () => {
              return false;
            },
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as any;
    it('should register a user with valid data', async () => {
      // Arrange
      const req = {} as RequestType;
      const userDto: UserDto = mockUser;
      const saveUserSpy = jest.spyOn(userService, 'saveUser');
      saveUserSpy.mockResolvedValue(undefined);

      // Act
      await controller.registerUser(req, res, userDto);

      // Assert
      expect(saveUserSpy).toHaveBeenCalledWith(req, userDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
      });
    });

    it('should handle validation errors and return a 400 response', async () => {
      // Arrange
      const req = {} as RequestType;
      const userDto: UserDto = mockUser;
      const saveUserSpy = jest.spyOn(userService, 'saveUser');
      saveUserSpy.mockRejectedValue(new Error('Validation failed'));

      // Act
      await controller.registerUser(req, res, userDto);

      // Assert
      expect(saveUserSpy).toHaveBeenCalledWith(req, userDto);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        error: 'Validation failed',
      });
    });

    it('should handle other errors and return a 500 response', async () => {
      // Arrange
      const req = {} as RequestType;
      const userDto: UserDto = mockUser;
      const saveUserSpy = jest.spyOn(userService, 'saveUser');
      saveUserSpy.mockRejectedValue('An unknown error occurred');

      // Act
      await controller.registerUser(req, res, userDto);

      // Assert
      expect(saveUserSpy).toHaveBeenCalledWith(req, userDto);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        error: 'An unknown error occurred.',
      });
    });
  });

  describe('authUser', () => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as any;
    it('should authenticate a user with a valid token', async () => {
      // Arrange
      const req = {} as RequestType;
      const fetchUserSpy = jest.spyOn(userService, 'fetchUser');
      fetchUserSpy.mockResolvedValue({ name: 'nimal', role: 'admin' });

      // Act
      await controller.authUser(req, res);

      // Assert
      expect(fetchUserSpy).toHaveBeenCalledWith(req);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        data: { name: 'nimal', role: 'admin' },
      });
    });

    it('should handle authentication failure and return a 401 response', async () => {
      // Arrange
      const req = {} as RequestType;
      const fetchUserSpy = jest.spyOn(userService, 'fetchUser');
      fetchUserSpy.mockResolvedValue(null);

      // Act
      await controller.authUser(req, res);

      // Assert
      expect(fetchUserSpy).toHaveBeenCalledWith(req);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 401,
        error: 'Authentication failed. Invalid token or token not provided.',
      });
    });

    it('should handle other errors and return a 401 or 500 response', async () => {
      // Arrange
      const req = {} as RequestType;
      const fetchUserSpy = jest.spyOn(userService, 'fetchUser');
      fetchUserSpy.mockRejectedValue('An unknown error occurred');

      // Act
      await controller.authUser(req, res);

      // Assert
      expect(fetchUserSpy).toHaveBeenCalledWith(req);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        error: 'An unknown error occurred.',
      });
    });
  });

  describe('newAccessToken', () => {
    it('should create a new access token and set a cookie', async () => {
      // Arrange
      const req = {} as RequestType;
      const res = {
        cookie: jest.fn(),
        status: jest.fn(() => res),
        json: jest.fn(),
      } as any;
      const createAccessTokenSpy = jest.spyOn(userService, 'createAccessToken');
      createAccessTokenSpy.mockResolvedValue({
        token: 'newToken',
        data: { name: 'nimal', role: 'admin' },
      });

      // Act
      await controller.newAccessToken(req, res);

      // Assert
      expect(createAccessTokenSpy).toHaveBeenCalledWith(req);
      expect(res.cookie).toHaveBeenCalledWith('token', 'newToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        data: { name: 'nimal', role: 'admin' },
      });
    });

    it('should handle errors and return a 500 response', async () => {
      // Arrange
      const req = {} as RequestType;
      const res = {
        cookie: jest.fn(),
        status: jest.fn(() => res),
        json: jest.fn(),
      } as any;
      const createAccessTokenSpy = jest.spyOn(userService, 'createAccessToken');
      createAccessTokenSpy.mockRejectedValue('An unknown error occurred');

      // Act
      await controller.newAccessToken(req, res);

      // Assert
      expect(createAccessTokenSpy).toHaveBeenCalledWith(req);
      expect(res.cookie).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        error: 'An unknown error occurred.',
      });
    });
  });

  describe('validateUser', () => {
    it('should validate a user with valid credentials', async () => {
      // Arrange
      const req = {} as loginType;
      const res = {
        cookie: jest.fn(),
        status: jest.fn(() => res),
        json: jest.fn(),
      } as any;
      const authenticateUserSpy = jest.spyOn(userService, 'authenticateUser');
      authenticateUserSpy.mockResolvedValue({
        token: 'validToken',
        refreshToken: 'validRefreshToken',
      });

      // Act
      await controller.validateUser(req, res);

      // Assert
      expect(authenticateUserSpy).toHaveBeenCalledWith(req);
      expect(res.cookie).toHaveBeenCalledWith('token', 'validToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      expect(res.cookie).toHaveBeenCalledWith(
        'refreshToken',
        'validRefreshToken',
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        },
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
      });
    });

    it('should handle authentication failure and return a 400 response', async () => {
      // Arrange
      const req = {} as loginType;
      const res = {
        cookie: jest.fn(),
        status: jest.fn(() => res),
        json: jest.fn(),
      } as any;
      const authenticateUserSpy = jest.spyOn(userService, 'authenticateUser');
      authenticateUserSpy.mockResolvedValue(null);

      // Act
      await controller.validateUser(req, res);

      // Assert
      expect(authenticateUserSpy).toHaveBeenCalledWith(req);
      expect(res.cookie).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        error: 'The provided username or password is invalid',
      });
    });

    it('should handle errors and return a 500 response', async () => {
      // Arrange
      const req = {} as loginType;
      const res = {
        cookie: jest.fn(),
        status: jest.fn(() => res),
        json: jest.fn(),
      } as any;
      const authenticateUserSpy = jest.spyOn(userService, 'authenticateUser');

      authenticateUserSpy.mockRejectedValue('An unknown error occurred');

      // Act
      await controller.validateUser(req, res);

      // Assert
      expect(authenticateUserSpy).toHaveBeenCalledWith(req);
      expect(res.cookie).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        error: 'An unknown error occurred.',
      });
    });
  });

  describe('logoutUser', () => {
    it('should log out the user and return a 200 response', async () => {
      // Arrange
      const req = {} as Request;
      const res = {
        cookie: jest.fn(),
        status: jest.fn(() => res),
        json: jest.fn(),
      } as any;

      // Act
      await controller.logoutUser(req, res);

      // Assert
      expect(res.cookie).toHaveBeenCalledWith('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0),
      });
      expect(res.cookie).toHaveBeenCalledWith('refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0),
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Logged out successfully.',
      });
    });

    it('should handle errors and return a 500 response', async () => {
      // Arrange
      const req = {} as Request;
      const res = {
        cookie: jest.fn(),
        status: jest.fn(() => res),
        json: jest.fn(),
      } as any;

      const error = new Error('An error occurred during logout.');
      jest.spyOn(res, 'cookie').mockImplementation(() => {
        throw error;
      });

      // Act
      await controller.logoutUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        error: 'An error occurred during logout.',
      });
    });
  });
});

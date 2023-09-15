import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { encryptPassword } from '../util/encrypted.decrypted.util';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Sign In', () => {
    const result: CreateUserDto = {
      userName: 'Pahasara',
      userEmail: 'pahasara@gmail.com',
      userPassword: encryptPassword('12345678'),
      role: 'admin',
    };

    // Create a custom mock for Express response
    const createMockResponse = (): any => {
      const res: any = {
        status: jest.fn().mockReturnThis(), // Mock status method
        json: jest.fn().mockReturnThis(), // Mock json method
        cookie: jest.fn().mockReturnThis(), // Mock cookie method
      };
      return res;
    };

    it('Sign In User Success', async () => {
      const signInResult = {
        accessToken: 'your-access-token',
        refreshToken: 'your-refresh-token',
      };
      authService.signIn = jest.fn().mockResolvedValue(signInResult);
      const res = createMockResponse(); // Create the custom response object
      await controller.signIn(result, res);
      expect(res.status).toHaveBeenCalledWith(200); // Check status method usage
      expect(res.json).toHaveBeenCalledWith(signInResult); // Check json method usage
    });

    test('Sign In User Fail', async () => {
      const error = new Error('Error');
      authService.signIn = jest.fn().mockRejectedValue(error);
      const res = createMockResponse(); // Create the custom response object
      res.status = jest.fn().mockReturnValue(res); // Mock the status method
      await expect(controller.signIn(result, res)).rejects.toThrowError(error);
    });
  });
});

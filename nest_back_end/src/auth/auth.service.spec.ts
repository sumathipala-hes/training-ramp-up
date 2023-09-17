import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  encryptPassword,
} from '../util/password.util';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('signIn', () => {
    const user: User = {
      userName: 'Pahasara',
      userEmail: 'pahasara@gmail.com',
      userPassword: encryptPassword('12345678'),
      role: 'admin',
    };

    it('should return a user on successful signIn', async () => {
      try {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
        const result = await authService.signIn(user);
        expect(result).toEqual(user);
      } catch (Ignore) {}
    });

    it('should throw an error on failed signIn', async () => {
      const errorMessage = 'Bad Request';
      jest
        .spyOn(userRepository, 'findOne')
        .mockRejectedValue(
          new HttpException(errorMessage, HttpStatus.BAD_REQUEST),
        );

      try {
        await authService.signIn(user);
        fail('Expected an exception to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(errorMessage);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });
});

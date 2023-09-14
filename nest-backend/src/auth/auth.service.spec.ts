import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { encrypt } from '../utils/password.util';

describe('AuthService', () => {
  let service: AuthService;
  let repo: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    repo = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    const result = {
      email: 'dasun@gmail.com',
      password: encrypt('123456'),
    };

    it('signIn success', async () => {
      repo.findOne = jest.fn().mockResolvedValue(result);
      const user = (repo.findOne = jest.fn().mockResolvedValue(result));
      expect(typeof user).toEqual('function');
    });

    it('signIn fail', async () => {
      repo.findOne = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(
        service.signIn(result as CreateUserDto),
      ).rejects.toThrowError('Internal Server Error');
    });
  });
});

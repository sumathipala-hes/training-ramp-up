import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { encrypt } from '../utils/password.util';
import { JwtService } from '@nestjs/jwt';

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
  });

  describe('signIn', () => {
    const result: User = {
      name: 'Dasun',
      email: 'dasun@gmail.com',
      password: '1234',
      role: 'admin',
    };

    test('signIn success', async () => {
      repo.findOne = jest.fn().mockResolvedValue(result);
      const data = await service.signIn(result);
      const user = (repo.findOne = jest.fn().mockResolvedValue(result));
      if(user){
        expect(typeof data).toEqual('object');
      }
    });

    test('signIn fail', async () => {
      repo.findOne = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(service.signIn(result)).rejects.toThrowError('Error');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { mockUser } from 'src/utils';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveUser', () => {
    it('should throw an error for invalid token', async () => {
      await expect(async () => {
        await service.saveUser(
          {
            cookies: {
              token: 'test Token',
              refreshToken: '',
            },
          },
          mockUser,
        );
      }).rejects.toThrow('Invalid refresh token');
    });

    it('should insert the user to DB without a token', async () => {
      const res = await service.saveUser(
        {
          cookies: {
            token: null,
            refreshToken: '',
          },
        },
        mockUser,
      );
      expect(res).resolves;
    });
  });

  describe('authUser', () => {
    it('should throw an error for invalid user authentication', async () => {
      await expect(async () => {
        await service.authenticateUser({
          body: { username: 'nimal@gmail.com', password: 'abcd' },
        });
      }).rejects.toThrow('The provided username or password is invalid');
    });
  });

  describe('fetchUser', () => {
    it('should throw an error for invalid refresh token', async () => {
      await expect(async () => {
        await service.fetchUser({
          cookies: {
            refreshToken: 'test Token',
            token: '',
          },
        });
      }).rejects.toThrow('Invalid refresh token');
    });
  });
});

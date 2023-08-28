import { dataSource } from '../configs/datasource.config';
import * as admin from 'firebase-admin';
import serviceAccount from '../configs/service.config.json';
import { User } from '../models/user.model';
import {
  deleteUser,
  getAllUsers,
  getUser,
  saveUser,
  updateUser,
} from '../services/user.service';

beforeAll(async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
});

describe('User Test', () => {
  const userRepo = dataSource.manager;

  describe('Get All User', () => {
    const allUsers = [
      {
        name: 'Dasun',
        email: 'dasun@gmail.com',
        password: '1234',
        role: 'admin',
      },
      {
        name: 'Dasun',
        email: 'dasun@gmail.com',
        password: '1234',
        role: 'admin',
      },
    ];

    test('Get All Users Success', async () => {
      userRepo.find = jest.fn().mockResolvedValue(allUsers);
      const data = await getAllUsers();
      expect(data).toEqual(allUsers);
    });

    test('Get All Users Fail', async () => {
      userRepo.find = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(getAllUsers()).rejects.toThrowError('Error');
    });
  });

  describe('Save User', () => {
    const newUser = {
      name: 'Dasun',
      email: 'dasun@gmail.com',
      password: '1234',
      role: 'admin',
    };

    test('Save User Success', async () => {
      userRepo.insert = jest.fn().mockResolvedValue(newUser);
      const data = await saveUser(newUser);
      expect(data).toEqual(newUser);
    });

    test('Save User Fail', async () => {
      userRepo.insert = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(saveUser(newUser)).rejects.toThrowError('Error');
    });
  });

  describe('Update User', () => {
    const user: User = {
      name: 'Dasun',
      email: 'dasun@gmail.com',
      password: '1234',
      role: 'admin',
    };

    test('Update User Success', async () => {
      userRepo.update = jest.fn().mockResolvedValue(user);
      const data = await updateUser('1', user);
      expect(data).toEqual(user);
    });

    test('Update User Fail', async () => {
      userRepo.update = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(updateUser('1', user)).rejects.toThrowError('Error');
    });
  });

  describe('Delete User', () => {
    const email = 'dasun@gmail.com';

    test('Delete User Success', async () => {
      userRepo.delete = jest.fn().mockResolvedValue(email);
      const data = await deleteUser(email);
      expect(data).toEqual(email);
    });

    test('Delete User Fail', async () => {
      userRepo.delete = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(deleteUser(email)).rejects.toThrowError('Error');
    });
  });

  describe('Sign In', () => {
    const userRepo = dataSource.manager.getRepository(User);
    const newUser = {
      name: 'Dasun',
      email: 'dasun@gmail.com',
      password: '1234',
      role: 'admin',
    };

    test('Sign In User Success', async () => {
      userRepo.findOne = jest.fn().mockResolvedValue(newUser);
      const data = await getUser(newUser.email, newUser.password);
      expect(data).toEqual(newUser);
    });

    test('Sign In User Fail', async () => {
      userRepo.insert = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(saveUser(newUser)).rejects.toThrowError('Error');
    });
  });
});

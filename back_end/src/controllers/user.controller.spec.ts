import { appDataSource } from '../configs/datasource.config';
import * as admin from 'firebase-admin';
import serviceAccount from '../configs/serviceAccountKey.json';
import { User } from '../models/user.models';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserByOne,
  updateUser,
} from '../services/user.service';

beforeAll(async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
});

describe('User Controller Checked', () => {
  const userRepo = appDataSource.manager;

  describe('Get All users', () => {
    const allUsers = [
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
    ];
    test('Get All users success', async () => {
      userRepo.getRepository(User).find = jest.fn().mockResolvedValue(allUsers);
      const data = await getAllUsers();
      expect(data).toEqual(allUsers);
    });
    test('Get All users fail', async () => {
      userRepo.getRepository(User).find = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(getAllUsers()).rejects.toThrowError('Error');
    });
  });

  describe('Get user', () => {
    const email = '';
    const name = '';
    const address = '';
    const mobileNumber = '';

    const user = {
      roleType: 'ADMIN',
      name: 'Nimesh',
      address: 'Galle',
      email: 'nimesh123@gmail.com',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
      password: 'Nimesh12@345',
    };

    test('Get user success', async () => {
      userRepo.getRepository(User).findOne = jest.fn().mockResolvedValue(user);
      const data = await getUserByOne(email || name || address || mobileNumber);
      expect(data).toEqual(user);
    });

    test('Get user fail', async () => {
      userRepo.getRepository(User).findOne = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(
        getUserByOne(email || name || address || mobileNumber),
      ).rejects.toThrowError('Error');
    });
  });

  describe('Create user', () => {
    const newUsers = {
      roleType: 'ADMIN',
      name: 'Nimesh',
      address: 'Galle',
      email: 'nimesh123@gmail.com',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
      password: 'Nimesh12@345',
    };

    test('Create user success', async () => {
      userRepo.getRepository(User).insert = jest
        .fn()
        .mockResolvedValue(newUsers);
      const data = await createUser(newUsers);
      expect(data).toEqual(newUsers);
    });
    test('Create user fail', async () => {
      userRepo.getRepository(User).insert = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(createUser(newUsers)).rejects.toThrowError('Error');
    });
  });

  describe('Update user', () => {
    const user: User = {
      roleType: 'ADMIN',
      name: 'Nimesh',
      address: 'Galle',
      email: 'nimesh123@gmail.com',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
      password: 'Nimesh12@345',
    };

    test('Update user success', async () => {
      userRepo.getRepository(User).update = jest.fn().mockResolvedValue(user);
      const data = await updateUser('nimesh123@gmail.com', user);
      expect(data).toEqual(user);
    });

    test('Update user fail', async () => {
      userRepo.getRepository(User).update = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(
        updateUser('nimesh123@gmail.com', user),
      ).rejects.toThrowError('Error');
    });
  });

  describe('Delete user', () => {
    const email = 'nimesh123@gmail.com';
    test('Delete user success', async () => {
      userRepo.getRepository(User).delete = jest.fn().mockResolvedValue(email);
      const data = await deleteUser(email);
      expect(data).toEqual(email);
    });

    test('Delete user fail', async () => {
      userRepo.getRepository(User).delete = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(deleteUser(email)).rejects.toThrowError('Error');
    });
  });
});

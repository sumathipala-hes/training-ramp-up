import { Any } from 'typeorm';
import { dataSource } from '../configs/datasource.config';
import { User } from '../models/user.model';
import { sendNotification } from '../utils/notification.util';
import {
  deleteUser,
  getAllUsers,
  signInUser,
  saveUser,
  updateUser,
} from './user.service';
import { encrypt } from '../utils/password.util';

jest.mock('../utils/notification.util', () => ({
  sendNotification: jest.fn(),
}));

describe('User Service Checked', () => {
  const userRepo = dataSource.manager;

  describe('Get All Users', () => {
    const allUsers = [
      {
        name: 'Dasun',
        email: 'dasun@gmail.com',
        password: '1234',
        role: 'admin',
      },
    ];
    test('Get All Users Success', async () => {
      // userRepo.find = jest.fn().mockResolvedValue(allUsers);
      // const data = await getAllUsers();
      // expect(data).toEqual(allUsers);
    });
    test('Get All Students Fail', async () => {
      // userRepo.find = jest.fn().mockRejectedValue(new Error('Error'));
      // await expect(getAllUsers()).rejects.toThrowError('Error');
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
      // userRepo.insert = jest.fn().mockResolvedValue(newUser);
      // const data = await saveUser(newUser);
      // newUser.password = encrypt('1234');
      // expect(data).toEqual(newUser);
      // expect(sendNotification).toHaveBeenCalledWith(
      //   'Successful',
      //   'New User Saved..!'
      // );
    });
    test('Save User Fail', async () => {
      // userRepo.insert = jest.fn().mockRejectedValue(new Error('Error'));
      // await expect(saveUser(newUser)).rejects.toThrowError('Error');
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
      // userRepo.update = jest.fn().mockResolvedValue(user);
      // const data = await updateUser('dasun@gmail.com', user);
      // user.password=encrypt('1234');
      // expect(data).toEqual(user);
      // expect(sendNotification).toHaveBeenCalledWith(
      //   'Successful',
      //   'New User Updated..!'
      // );
    });

    test('Update User Fail', async () => {
      // userRepo.update = jest.fn().mockRejectedValue(new Error('Error'));
      // await expect(updateUser('1', user)).rejects.toThrowError('Error');
    });
  });

  describe('Delete User', () => {
    const email = 'dasun@gmail.com';
    test('Delete User Success', async () => {
      // userRepo.delete = jest.fn().mockResolvedValue(email);
      // const data = await deleteUser(email);
      // expect(data).toEqual(email);
      // expect(sendNotification).toHaveBeenCalledWith(
      //   'Successful',
      //   'New User Deleted..!'
      // );
    });

    test('Delete User Fail', async () => {
      // userRepo.delete = jest.fn().mockRejectedValue(new Error('Error'));
      // await expect(deleteUser(email)).rejects.toThrowError('Error');
    });
  });

  describe('Get User', () => {
    const userRepo = dataSource.manager.getRepository(User);
    const result: User = {
      name: 'Dasun',
      email: 'dasun@gmail.com',
      password: '1234',
      role: 'admin',
    };

    test('Get Users Success', async () => {
      // userRepo.findOne = jest.fn().mockResolvedValue(result);
      // const data = await signInUser('dasun@gmail.com', '1234');
      // expect(typeof data).toEqual('string');
    });
    test('Get User Fail', async () => {
      // userRepo.findOne = jest.fn().mockRejectedValue(new Error('Error'));
      // await expect(signInUser('dasun@gmail.com', '1234')).rejects.toThrowError(
      //   'Error'
      // );
    });
  });
});

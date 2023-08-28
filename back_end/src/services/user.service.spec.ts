import { appDataSource } from '../configs/datasource.config';

import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { sendNotification } from '../util/notification.util';
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from './user.service';
import { User } from '../models/user.models';

jest.mock('../util/notification.util', () => ({
  sendNotification: jest.fn(),
}));

describe('User Service Checked', () => {
  const mockUserData = [
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
    {
      roleType: 'USER',
      name: 'Nimesh',
      address: 'Galle',
      email: 'nimesh12@gmail.com',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
      password: 'Nimesh12@345',
    },
  ];

  const mockFind = jest.fn().mockResolvedValue(mockUserData);

  const mockGetRepository = jest.fn().mockReturnValue({
    find: mockFind,
    insert: jest.fn(() => new InsertResult()),
    update: jest.fn(() => new UpdateResult()),
    delete: jest.fn(() => new DeleteResult()),
  });

  appDataSource.manager.getRepository = mockGetRepository;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('User list', () => {
    test('should fetch and return a list of users', async () => {
      const result = await getAllUsers();

      expect(result).toEqual(mockUserData);
      expect(mockGetRepository).toHaveBeenCalledWith(User);
      expect(mockFind).toHaveBeenCalledWith({ order: { email: 'DESC' } });
    });

    test('should throw an error if fetching users fails', async () => {
      const mockError = new Error('Mocked error');
      mockFind.mockRejectedValue(mockError);

      await expect(getAllUsers()).rejects.toThrow(mockError);
      expect(mockGetRepository).toHaveBeenCalledWith(User);
      expect(mockFind).toHaveBeenCalledWith({ order: { email: 'DESC' } });
    });
  });

  describe('Create User', () => {
    test('creates a new user', async () => {
      const userData = {
        roleType: 'ADMIN',
        name: 'Nimesh',
        address: 'Galle',
        email: 'nimesh123@gmail.com',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
        password: 'Nimesh12@345',
      };

      const result = await createUser(userData);

      expect(result).toBeInstanceOf(InsertResult);
      expect(mockGetRepository).toHaveBeenCalledWith(User);
      expect(mockGetRepository().insert).toHaveBeenCalledWith(userData);
      expect(sendNotification).toHaveBeenCalledWith(
        'New User Added',
        'A New User has been Added to the Database.',
      );
    });

    test('throws an error if creation fails', async () => {
      const userData = {
        roleType: 'ADMIN',
        name: 'Nimesh',
        address: 'Galle',
        email: 'nimesh123@gmail.com',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
        password: 'Nimesh12@345',
      };

      const errorMessage = 'Insert failed';
      const mockInsert = jest.fn(() => Promise.reject(new Error(errorMessage)));
      mockGetRepository().insert = mockInsert;

      await expect(createUser(userData)).rejects.toThrow(errorMessage);
      expect(mockGetRepository).toHaveBeenCalledWith(User);
      expect(mockInsert).toHaveBeenCalledWith(userData);
      expect(sendNotification).not.toHaveBeenCalled();
    });
  });

  describe('Update User', () => {
    test('update a  user', async () => {
      const updateUserData = {
        roleType: 'ADMIN',
        name: 'Nimesh',
        address: 'Galle',
        email: 'nimesh123@gmail.com',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
        password: 'Nimesh12@345',
      };

      const result = await updateUser('nimesh123@gmail.com', updateUserData);

      expect(result).toBeInstanceOf(UpdateResult);
      expect(mockGetRepository).toHaveBeenCalledWith(User);
      expect(mockGetRepository().update).toHaveBeenCalledWith(
        'nimesh123@gmail.com',
        updateUserData,
      );
      expect(sendNotification).toHaveBeenCalledWith(
        'User Updated',
        'A User has been Updated in the Database.',
      );
    });

    test('throws an error if update fails', async () => {
      const updateUserData = {
        roleType: 'ADMIN',
        name: 'Nimesh',
        address: 'Galle',
        email: 'nimesh123@gmail.com',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
        password: 'Nimesh12@345',
      };

      const errorMessage = 'Update failed';
      const mockUpdate = jest.fn(() => Promise.reject(new Error(errorMessage)));
      mockGetRepository().update = mockUpdate;

      await expect(
        updateUser('nimesh123@gmail.com', updateUserData),
      ).rejects.toThrow(errorMessage);
      expect(mockGetRepository).toHaveBeenCalledWith(User);
      expect(mockUpdate).toHaveBeenCalledWith(
        'nimesh123@gmail.com',
        updateUserData,
      );
      expect(sendNotification).not.toHaveBeenCalled();
    });
  });

  describe('Delete User', () => {
    test('Delete a  user', async () => {
      const result = await deleteUser('nimesh123@gmail.com');

      expect(result).toBeInstanceOf(DeleteResult);
      expect(mockGetRepository).toHaveBeenCalledWith(User);
      expect(mockGetRepository().delete).toHaveBeenCalledWith(
        'nimesh123@gmail.com',
      );
      expect(sendNotification).toHaveBeenCalledWith(
        'User Deleted',
        'A User has been Deleted from the Database.',
      );
    });

    test('throws an error if delete fails', async () => {
      const errorMessage = 'Delete failed';
      const mockDelete = jest.fn(() => Promise.reject(new Error(errorMessage)));
      mockGetRepository().delete = mockDelete;

      await expect(deleteUser('nimesh123@gmail.com')).rejects.toThrow(
        errorMessage,
      );
      expect(mockGetRepository).toHaveBeenCalledWith(User);
      expect(mockDelete).toHaveBeenCalledWith('nimesh123@gmail.com');
      expect(sendNotification).not.toHaveBeenCalled();
    });
  });
});

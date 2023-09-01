import { DeleteResult, UpdateResult } from 'typeorm';
import { dataSource } from '../../configs/db.config';
import { User } from '../../models/user.model';
import { sendNotification } from '../../util/notification.util';
import {
  retrieveAllUsers,
  registerUser,
  updateUser,
  deleteUser,
  signInUser,
} from '../../services/user.service';

jest.mock('../../util/notification.util', () => ({
  sendNotification: jest.fn(),
}));

describe('User Controller', () => {
  const userRepo = dataSource.manager.getRepository(User);

  describe('Retrieve All users', () => {
    const allUsers = [
      {
        userName: 'Pahasara',
        userEmail: 'pahasara@gmail.com',
        userPassword: '12345678',
        role: 'Admin',
      },
    ];

    test('should retrieve all users successfully', async () => {
      userRepo.find = jest.fn().mockResolvedValue(allUsers);
      const data = await retrieveAllUsers();
      expect(data).toEqual(allUsers);
    });

    test('should handle failure to retrieve all users', async () => {
      userRepo.find = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(retrieveAllUsers()).rejects.toThrowError('Error');
    });
  });

  describe('register User', () => {
    const newUser = {
      userName: 'Pahasara',
      userEmail: 'pahasara@gmail.com',
      userPassword: '12345678',
      role: 'Admin',
    };

    test('should create user successfully', async () => {
      userRepo.insert = jest.fn().mockResolvedValue(newUser);
      const data = await registerUser(newUser);
      expect(data).toEqual(newUser);
      expect(sendNotification).toHaveBeenCalledWith(
        'Success',
        'User Registerd..!',
      );
    });

    test('should handle failure to create user', async () => {
      userRepo.insert = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(registerUser(newUser)).rejects.toThrowError('Error');
    });
  });

  describe('Update user', () => {
    const updatedUser: User = {
      userName: 'Pahasara',
      userEmail: 'pahasara@gmail.com',
      userPassword: '12345678',
      role: 'Admin',
    };

    test('should update user successfully', async () => {
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: updatedUser,
        generatedMaps: [],
      };
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        update: jest.fn().mockResolvedValue(mockUpdateResult),
      });

      const result = await updateUser('pahasara@gmail.com', updatedUser);
      expect(result).toEqual(mockUpdateResult);
      expect(sendNotification).toHaveBeenCalledWith(
        'Success',
        'User Updated..!',
      );
    });

    test('should handle failure to update user', async () => {
      const errorMessage = 'Error updating user.';
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        update: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      await expect(
        updateUser('pahasara@gmail.com', updatedUser),
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe('Delete user', () => {
    const email = 'pahasara@gmail.com';

    test('should delete user successfully', async () => {
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: undefined,
      }; // Mimic successful delete
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        delete: jest.fn().mockResolvedValue(mockDeleteResult),
      });

      const result = await deleteUser(email);
      expect(result).toEqual(mockDeleteResult);
      expect(sendNotification).toHaveBeenCalledWith(
        'Success',
        'User Deleted..!',
      );
    });

    test('should handle failure to delete user', async () => {
      const errorMessage = 'Error deleting user.';
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        delete: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      await expect(deleteUser(email)).rejects.toThrowError(errorMessage);
    });
  });

  describe('SignIn user', () => {
    const email = 'pahasara@gmail.com';
    const password = '12345678';
    const user = {
      userName: 'Pahasara',
      userEmail: 'pahasara@gmail.com',
      userPassword: '12345678',
      role: 'Admin',
    };
  
    test('should signIn user successfully', async () => {
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue(user),
      }); // Mocking getRepository method
  
      const data = await signInUser(email, password);
      expect(data).toEqual(user);
    });
  
    test('should handle failure to signIn user', async () => {
      const errorMessage = 'Error';
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        findOne: jest.fn().mockRejectedValue(new Error(errorMessage)),
      }); // Mocking getRepository method
  
      await expect(signInUser(email, password)).rejects.toThrowError(errorMessage);
    });
  });  
});

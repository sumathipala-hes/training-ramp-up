import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { dataSource } from '../configs/datasource.config';
import { User } from '../models/user.model';
import { sendNotification } from '../utils/notification.util';

export const getAllUsers = async (): Promise<Array<User>> => {
  try {
    const users: Array<User> = await dataSource.manager.find(User, {
      order: {
        email: 'DESC',
      },
    });
    return users;
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (user: User): Promise<InsertResult> => {
  try {
    return await dataSource.manager.insert(User, user);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  email: string,
  user: User
): Promise<UpdateResult> => {
  try {
    const updatedUser = await dataSource.manager.update(User, email, user);
    sendNotification('Successful', 'New Student Updated..!');
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (email: string): Promise<DeleteResult> => {
  try {
    const deletedUser = await dataSource.manager.delete(User, email);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userRepo = dataSource.manager.getRepository(User);
    const user = await userRepo.findOne({
      where: {
        email: email,
      },
    });

    console.log(user);
    console.log(password);
    

    if (user) {
      console.log(user.password);
      const isMatch = user.password == password;
      if (isMatch) {
        return user;
      } else {
        throw new Error('Password not match');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  }
};

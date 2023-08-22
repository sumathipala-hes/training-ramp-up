import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { dataSource } from '../configs/datasource.config';
import { User } from '../models/user.model';

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
    const savedUser = await dataSource.manager.insert(User, user);
    return savedUser;
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
    return updatedUser;
  } catch (error) {
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

import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { dataSource } from '../configs/db.config';
import { User } from '../models/user.model';
import { sendNotification } from '../util/notification.util';

const registerUser = async (user: User): Promise<InsertResult> => {
  try {
    const newUser: InsertResult = await dataSource.manager
      .getRepository(User)
      .insert(user);
    sendNotification('Success', 'User Registerd..!');
    return newUser;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

const retrieveAllUsers = async (): Promise<User[]> => {
  try {
    const users: User[] = await dataSource.manager
      .getRepository(User)
      .find({ order: { userEmail: 'DESC' } });
    return users;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

const updateUser = async (id: string, user: User): Promise<UpdateResult> => {
  try {
    const updatedUser: UpdateResult = await dataSource.manager
      .getRepository(User)
      .update(id, user);
    if (updatedUser.affected === 1) {
      updatedUser.raw = user;
    } else {
      throw new Error('User not found.');
    }
    sendNotification('Success', 'User Updated..!');
    return updatedUser;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

const deleteUser = async (id: string): Promise<DeleteResult> => {
  try {
    const deletedUser: DeleteResult = await dataSource.manager
      .getRepository(User)
      .delete(id);
    if (deletedUser.affected === 1) {
      sendNotification('Success', 'User Deleted..!');
    } else {
      throw new Error('User not found.');
    }
    return deletedUser;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

export { registerUser, retrieveAllUsers, updateUser, deleteUser };

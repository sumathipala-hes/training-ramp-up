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

export { registerUser };

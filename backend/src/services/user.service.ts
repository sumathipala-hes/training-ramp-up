import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { dataSource } from '../configs/datasource.config';
import { User } from '../models/user.model';
import { sendNotification } from '../utils/notification.util';
import jwt = require('jsonwebtoken');
import { jwtConfig } from '../configs/jwt.config';
import { decrypt, encrypt } from '../utils/password.util';

export const getAllUsers = async (): Promise<Array<User>> => {
  try {
    const users: Array<User> = await dataSource.manager.find(User, {
      order: {
        email: 'DESC',
      },
    });
    if (users.length == 0) {
      sendNotification('Warning', 'No Users Found..!');
      throw new Error('No Users Found..!');
    }
    users.forEach((user) => {
      user.password = decrypt(user.password);
    });
    return users;
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (user: User): Promise<InsertResult> => {
  try {
    const savedUser = await dataSource.manager.insert(User, {
      ...user,
      password: encrypt(user.password),
    });
    sendNotification('Successful', 'New User Saved..!');
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
    const updatedUser = await dataSource.manager.update(User, email, {
      ...user,
      password: encrypt(user.password),
    });
    sendNotification('Successful', 'New User Updated..!');
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (email: string): Promise<DeleteResult> => {
  try {
    const deletedUser = await dataSource.manager.delete(User, email);
    sendNotification('Successful', 'New User Deleted..!');
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const userRepo = dataSource.manager.getRepository(User);
    const user = await userRepo.findOne({
      where: {
        email: email,
      },
    });
    password = encrypt(password);

    if (user) {
      console.log(user.password);
      if (user.password == password) {
        const accessToken = jwt.sign(
          { email: user.email, role: user.role },
          jwtConfig.secretKey!,
          { expiresIn: '5h' }
        );
        const refreshToken = jwt.sign(
          { email: user.email },
          jwtConfig.secretKey,
          { expiresIn: '7d' }
        );

        return { accessToken: accessToken, refreshToken: refreshToken };
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

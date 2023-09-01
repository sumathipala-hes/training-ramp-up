import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { dataSource } from '../configs/db.config';
import { User } from '../models/user.model';
import { sendNotification } from '../util/notification.util';
import jwt = require('jsonwebtoken');
import { jwtConfig } from '../configs/jwt.config';
import { decryptPassword, encryptPassword } from '../util/encrypted.decrypted.util';

const registerUser = async (user: User): Promise<InsertResult> => {
  try {
    const encryptedPassword = encryptPassword(
      user.userPassword,
    );

    // Create a new user object with the encrypted password
    const userWithEncryptedPassword = {
      ...user,
      userPassword: encryptedPassword,
    };

    // Register the user with the encrypted password
    const newUser: InsertResult = await dataSource.manager
      .getRepository(User)
      .insert(userWithEncryptedPassword);
    sendNotification('Success', 'User Registered..!');
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
    users.forEach(user => {
      user.userPassword = decryptPassword(user.userPassword);
    });
    return users;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

const updateUser = async (id: string, user: User): Promise<UpdateResult> => {
  try {
    user.userPassword = encryptPassword(user.userPassword);

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

const signInUser = async (
  userEmail: string,
  userPassword: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await dataSource.manager.getRepository(User).findOne({
      where: {
        userEmail: userEmail,
      },
    });

    console.log(user);
    console.log(userPassword);

    if (user) {
      // Decrypt the stored password
      const storedEncryptedPassword = user.userPassword;
      console.log(storedEncryptedPassword);

      // Decrypt the stored password and compare it with the password provided
      const decryptedPassword = decryptPassword(
        storedEncryptedPassword,
      );

      // Return the user if the password matches
      const isMatch = userPassword == decryptedPassword;
      if (isMatch) {
        const tokenPayload = { userEmail: user.userEmail, role: user.role };
        const accessToken = jwt.sign(tokenPayload, jwtConfig.secretKey!, {
          expiresIn: '5h',
        });
        const refreshToken = jwt.sign(tokenPayload, jwtConfig.refreshKey!, {
          expiresIn: '24h',
        });

        return { accessToken, refreshToken };
        // return user;
      } else {
        throw new Error('Password not match');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

export { registerUser, retrieveAllUsers, updateUser, deleteUser, signInUser };

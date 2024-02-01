/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express';
import dataSource from '../config/dataSource';

import { User } from '../models/user';

export const createUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const userRepository = dataSource.getRepository(User);
    const newUser = userRepository.create(request.body);
    await userRepository.save(newUser);
    response.status(201).json(newUser);
  } catch (error) {
    console.log('Error saving user:', error);
    response.status(500).json({ message: 'Error saving user' });
  }
};

export const allUsers = async (request: Request, response: Response): Promise<void> => {
  try {
    const userRepository = dataSource.getRepository(User);
    const users = await userRepository.find();
    response.status(200).json(users);
  } catch (error) {
    console.log('Error fetching users:', error);
    response.status(500).json({ message: 'Error retrieving user data' });
  }
};

export const oneUser = async (request: Request, response: Response): Promise<void> => {
  const id = parseInt(request.params.id);
  try {
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (user === null) {
      response.status(404).json({ message: 'User not found' });
    } else {
      response.status(200).json(user);
    }
  } catch (error) {
    console.log('Error fetching user:', error);
    response.status(500).json({ message: 'Error retrieving user dtails' });
  }
};

export const removeUser = async (request: Request, response: Response): Promise<void> => {
  const id = parseInt(request.params.id);

  try {
    const userRepository = dataSource.getRepository(User);
    const userToRemove = await userRepository.findOneBy({ id });

    if (userToRemove === null) {
      response.status(404).json({ message: 'user not found' });
    } else {
      await userRepository.remove(userToRemove);
      response.status(200).json(userToRemove);
    }
  } catch (error) {
    console.log('Error removing user:', error);
    response.status(500).json({ message: 'Error removing user' });
  }
};

export const updateUser = async (request: Request, response: Response): Promise<void> => {
  const id = parseInt(request.params.id);
  const { name, email, role, password, active } = request.body;

  try {
    const userRepository = dataSource.getRepository(User);
    const userToUpdate = await userRepository.findOneBy({ id });
    if (userToUpdate === null) {
      response.status(404).json({ message: 'User not found' });
    } else {
      const updatedUser = Object.assign(new User(), {
        id,
        name,
        email,
        role,
        password,
        active
      });
      await userRepository.save(updatedUser);
      response.status(201).json(updatedUser);
    }
  } catch (error) {
    console.log('Error updating user:', error);
    response.status(500).json({ message: 'Error updating user details' });
  }
};

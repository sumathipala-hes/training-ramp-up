import { RequestHandler, Request, Response } from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  saveUser,
  updateUser,
} from '../services/user.service';
import jwt = require('jsonwebtoken');
import { jwtConfig } from '../configs/jwt.config';

export const retriveAllUsers: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addUsers: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await saveUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateUsers: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await updateUser(req.params.email, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUsers: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await deleteUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signIn: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);
    const user = await getUser(req.body.email, req.body.password);
    if (user) {
      const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        jwtConfig.secretKey!,
        { expiresIn: '5h' }
      );
      const refreshToken = jwt.sign(
        { email: user.email, role: user.role },
        jwtConfig.refreshKey!,
        { expiresIn: '24h' }
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
      });
      console.log(accessToken, refreshToken);
      res.status(200).json({ accessToken, refreshToken });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signOut: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Sign Out successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};

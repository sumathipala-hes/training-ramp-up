import { RequestHandler, Request, Response } from 'express';
import {
  deleteUser,
  getAllUsers,
  saveUser,
  signInUser,
  updateUser,
} from '../services/user.service';

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
    const tokens = await signInUser(req.body.email, req.body.password);
    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
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
    res.status(200).json({ message: 'Sign Out successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};

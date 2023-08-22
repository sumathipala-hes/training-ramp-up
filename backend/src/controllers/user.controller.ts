import { RequestHandler, Request, Response } from 'express';
import {
  deleteUser,
  getAllUsers,
  saveUser,
  updateUser,
} from '../services/user.service';
import { generateToken } from '../middleware/jwt.middleware';

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
    // const user = await saveUser(req.body);
    const token = generateToken(req.body.email);
    console.log(token);
    res.status(200).json(token);
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
    const user = await updateUser(req.params.id, req.body);
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

export const login: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = generateToken(req.body);

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

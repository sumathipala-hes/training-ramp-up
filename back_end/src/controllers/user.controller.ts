import { Request, RequestHandler, Response } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByOne,
  signInUser,
  updateUser,
} from '../services/user.service';

export const requestGetAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await getAllUsers();
    return res
      .status(200)
      .json({ data: users, message: 'User found successfully' });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(400).json({ message: 'User not found' });
    } else {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const requestUsersByOne: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { search } = req.params;
    const user = await getUserByOne(search);
    return res
      .status(200)
      .json({ data: user, message: 'User found successfully' });
  } catch (error: any) {
    if (error.message === 'No user found') {
      return res.status(400).json({ message: 'User not found' });
    } else {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const requestCreateUser: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userData = req.body;
  try {
    const newUser = await createUser(userData);
    res.status(200).json({
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const requestUpdateUser: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await updateUser(id, userData);

    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(400).json({ message: 'User not found' });
    } else {
      res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const requestDeleteUser: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);

    return res.status(200).json({
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(400).json({ message: 'User not found' });
    } else {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const signIn: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const accessToken = await signInUser(req.body.email, req.body.password);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

export const signOut: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Sign out successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../configs/jwt.config';
import { User } from '../models/user.model';

enum UserRole {
  Admin = 'ADMIN',
}

export const generateToken = (userEmail: string): string => {
  const token = jwt.sign({ sub: userEmail }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
  });
  return token;
};

export const authenticatePermissions = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const userCookie = req.cookies.user;

  if (!userCookie) {
    res.sendStatus(403);
    return;
  }

  try {
    const payload = jwt.verify(userCookie, jwtConfig.secretKey);
    const user = payload as User;
    const role = user.role;

    req.method === 'GET' || role === UserRole.Admin
      ? next()
      : res.sendStatus(401);
  } catch (error) {
    res.sendStatus(403);
  }
};

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.sendStatus(403);
    return;
  }

  try {
    jwt.verify(accessToken, jwtConfig.secretKey);
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../configs/jwt.config';
import { User } from '../models/user.model';

enum UserRole {
  Admin = 'admin',
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
  next: NextFunction
) => {
  const cookies = req.headers.cookie;
  
  if (!cookies) {
    return res.sendStatus(403);
  }
  
  const cookieArray = cookies.split(';');
  const roleCookie = cookieArray.find(cookie => cookie.trim().startsWith('role='));

  if (!roleCookie) {
    return res.sendStatus(403);
  }
  
  const accessToken = roleCookie.split('=')[1].trim();

  try {
    if (accessToken == UserRole.Admin) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  } catch {
    return res.sendStatus(403);
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

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../configs/jwt.config';
import { User } from '../models/user.models';

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ sub: userId }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
  });
  return token;
};

export const authenticatePermissions = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.cookies.user;
  if (!user) {
    res.sendStatus(403);
  } else {
    try {
      if (req.method == 'GET') {
        return next();
      } else {
        const payload = jwt.verify(user, jwtConfig.secretKey);
        const userT = payload as User;
        const role = userT.roleType;
        role == 'ADMIN' ? next() : res.sendStatus(401);
      }
    } catch {
      res.sendStatus(403);
    }
  }
};

export const authorizationPermissions = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.sendStatus(403);
  } else {
    try {
      const payload = jwt.verify(accessToken, jwtConfig.secretKey);
      payload ? next() : res.sendStatus(401);
    } catch {
      res.sendStatus(403);
    }
  }
};

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../configs/jwt.config';
import { User } from '../models/user.model';

export const authenticatePermissions = (
  req: Request,
  res: Response,
  next: NextFunction
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
        const role = userT.role;
        role == 'Admin' ? next() : res.sendStatus(401);
      }
    } catch {
      res.sendStatus(403);
    }
  }
};

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.sendStatus(403);
  } else {
    try {
      const payload = jwt.verify(accessToken, jwtConfig.secretKey);
      payload? next() : res.sendStatus(401);
    } catch {
      res.sendStatus(403);
    }
  }
}

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../configs/jwt.config';
import { User } from '../models/user.model';

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
      payload ? next() : res.sendStatus(401);
    } catch {
      res.sendStatus(403);
    }
  }
};

export const authPermissions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.cookie?.split('=')[1];
  console.log(accessToken);
  if (!accessToken) {
    return res.sendStatus(403);
  } else {
    try {
      const payload = jwt.verify(accessToken, jwtConfig.secretKey);

      if ((payload as { role: string }).role == 'admin') {
        return next();
      } else {
        return res.sendStatus(403);
      }
    } catch {
      return res.sendStatus(500);
    }
  }
};

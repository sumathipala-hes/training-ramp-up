import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from './auth.constants';
import jwt from 'jsonwebtoken';

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.sendStatus(403);
  } else {
    try {
      const payload = jwt.verify(accessToken, jwtConstants.secretKey);
      payload ? next() : res.sendStatus(401);
    } catch {
      res.sendStatus(403);
    }
  }
};

export const authPermissions = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers.cookie?.split('=')[1];
  if (!accessToken) {
    return res.sendStatus(403);
  } else {
    try {
      const payload = jwt.verify(accessToken, jwtConstants.secretKey);
      console.log(payload);

      if ((payload as { role: string }).role == 'admin') {
        return next();
      } else {
        return res.sendStatus(403);
      }
    } catch {
      console.log('No access token');
      return res.sendStatus(500);
    }
  }
};

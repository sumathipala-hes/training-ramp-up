import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../configs/jwt.config';

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

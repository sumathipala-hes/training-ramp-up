import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from  '../configs/jwt.config';

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ sub: userId }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
  });
  return token;
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
  }

  jwt.verify(token!, jwtConfig.secretKey, (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.body = payload;
    next();
  });
};


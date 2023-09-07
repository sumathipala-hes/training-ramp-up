import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../configs/jwt.config';

export const authorizationPermissions = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const accessToken = req.headers.authorization?.split(':')[1];

  if (!accessToken) {
    res.sendStatus(403);
  } else {
    try {
      const payload = jwt.verify(accessToken, jwtConfig.secretKey);

      if (payload) {
        next();
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.error('Authorization error:', error);
      res.sendStatus(403);
    }
  }
};

export const authPermissions = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const roleType = req.headers.authorization?.split(':')[1];

  if (!roleType) {
    return res.sendStatus(403);
  }

  try {
    if (req.method === process.env.GET_REQUEST) {
      return next();
    }

    const payload = jwt.verify(roleType, jwtConfig.secretKey);

    const userType = payload as { roleType: string };
    const role = userType.roleType;
    if (role === process.env.ADMIN_ROLE) {
      return next();
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.sendStatus(403);
  }
};

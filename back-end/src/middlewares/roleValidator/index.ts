// roleValidator.js

import { Request, Response, NextFunction } from 'express';
import { fetchUser } from '../../services/user';

export const roleValidator = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try{    
        const user = await fetchUser(req);
        if(user){
            if (allowedRoles.includes(user.role)) {
                next();
            } else {
                return res.status(403).json({
                  status: 403,
                  message: 'Forbidden. You do not have the required role.',
                });
            }
        }

    }catch(err){
        if (err instanceof Error) {                             
            res.status(401).json({
                status: 401,
                error: err.message,
            });
        } else {
            res.status(500).json({
                status: 500,
                error: "An unknown error occurred.",
            });
        }
    }



  };
};

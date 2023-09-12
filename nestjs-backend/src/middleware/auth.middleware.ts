/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { verify, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction ) {
        const accessToken = req.cookies['access-token'] as string;

        if (!accessToken) {
            return res.status(401).json({ auth: false, error : 'User is not Authenticated'});
        }

        try {
            const verifiedJWT = verify(accessToken, process.env.JWT_SECRET as string)
            if (verifiedJWT) {
                return next()
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return res.status(401).json({ auth: false, error: 'Access Token has expired' });
            }
            return res.status(400).json({ auth: false, error: error})            
        }
    }
}
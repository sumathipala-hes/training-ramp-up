/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { verify, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class RefreshMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction ) {
        const refreshToken = req.cookies['refresh-token'] as string;

        if (!refreshToken) {
            return res.status(401).json({ auth: false, error : 'User is not Authenticated'});
        }

        try {
            const verifiedJWT = verify(refreshToken, process.env.JWT_REFRESH_SECRET as string)
            if (verifiedJWT) {
                return next()
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return res.status(401).json({ auth: false, error: 'Refresh Token has expired' });
            }
            return res.status(400).json({ auth: false, error: error})            
        }
    }
}
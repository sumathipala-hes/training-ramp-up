/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

@Injectable()
export class AdminAccess implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    use(req: Request, res: Response, next: NextFunction ) {
        const accessToken = req.cookies['access-token'] as string;

        if (!accessToken) {
            throw new Error('User is not logged in. Cannot fetch the role.');
        }

        try {
            const decodedToken = this.jwtService.decode(accessToken) as JwtPayload;
            if (decodedToken.role === 'admin') {
                return next()
            } else {
                throw new Error('Access denied');
            }
        } catch (error) {
            return res.status(401).json({ auth: false, error: 'Access denied'})            
        }
    }
}

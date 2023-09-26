/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { verify, TokenExpiredError } from 'jsonwebtoken';
import { Request } from 'express';
import { JwtPayload } from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async authenticatedUser(req: Request): Promise<string> {
        const accessToken = req.cookies['access-token'] as string;

        if (!accessToken) {
            throw new Error('User is not authenticated');
        }

        try {
            const verifiedJWT = verify(accessToken, process.env.JWT_SECRET as string)
            if (verifiedJWT) {
                return;
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new Error('Access Token has expired');
            }
            throw new Error('Invalid token or authentication failed');
        }
    }

    async getNewAccessToken(req: Request) {
        const refreshToken = req.cookies['refresh-token'] as string;

        if (!refreshToken) {
            throw new Error('No Refresh Token Found');
        }
        try {
            const decodedToken = verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
            if (decodedToken) {
                const user = {
                    id: decodedToken.id,
                    username: decodedToken.username,
                    role: decodedToken.role,
                };
                const accessToken = this.jwtService.sign(
                    user,
                    { secret: process.env.JWT_SECRET as string, expiresIn: '60m'}
                );
                return { accessToken }
                
            } else {
                throw new Error('Decoded token is null');
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new Error('Access Token has expired');
            } else {
                throw error
            }
        }
    }
}
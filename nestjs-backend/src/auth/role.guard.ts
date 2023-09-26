/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "./roles";
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.cookies['access-token'] as string;

        try {
            if (accessToken) {
                const decodedToken = this.jwtService.verify(accessToken, {
                    secret: process.env.JWT_SECRET as string,
                }) as JwtPayload;
                if (decodedToken) {
                    if (Object.values(Role).includes(decodedToken.role)) {
                        return true;
                    } else {
                        throw new UnauthorizedException('Access denied');
                    }
                } else {
                    throw new UnauthorizedException('Unauthorized. Invalid Token')
                }
            } else {
                throw new Error('Unauthorized. Token not found');
            }
        } catch (error) {
            throw error;
        }       
    }
}
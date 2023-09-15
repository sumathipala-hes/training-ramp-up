import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    try {
      const refreshToken = req.cookies.refreshToken;
      const decodedRefToken = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string,
      ) as jwt.JwtPayload;
      if (roles.includes(decodedRefToken.role)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}

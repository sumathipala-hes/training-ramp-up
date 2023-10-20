import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const tokenParts = request.headers.cookie?.split('; ');

    let accessToken = null;

    for (const part of tokenParts) {
      if (part.startsWith('accessToken=')) {
        accessToken = part.substring('accessToken='.length);
        break;
      }
    }

    try {
      if (accessToken) {
        const decoded = (await this.jwtService.verify(accessToken, {
          secret: jwtConfig.secretKey,
        })) as { email: string; roleType: Role };
        if (decoded) {
          if (requiredRoles.includes(decoded.roleType)) {
            return true;
          } else {
            throw new UnauthorizedException('You are not authorized to access');
          }
        } else {
          throw new UnauthorizedException('Invalid token');
        }
      } else {
        throw new ForbiddenException('Access token not found');
      }
    } catch (err) {
      throw err;
    }
  }
}

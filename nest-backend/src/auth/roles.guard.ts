import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';
import { jwtConstants } from './auth.constants';

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

    const req = context.switchToHttp().getRequest();
    const tokenParts = req.headers.cookie?.split('; ');

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
          secret: jwtConstants.secretKey,
        })) as { email: string; role: Role };
        if (decoded) {
          if (requiredRoles.includes(decoded.role)) {
            return true;
          } else {
            throw new HttpException('Invalid Role', HttpStatus.FORBIDDEN);
          }
        } else {
          throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException(
          'Access Token Not Found',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

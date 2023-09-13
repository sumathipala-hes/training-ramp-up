import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
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
    const accessToken = req.headers.cookie?.split('=')[1];

    try {
      if (accessToken) {
        const decoded = (await this.jwtService.verify(accessToken, {
          secret: jwtConstants.secretKey,
        })) as { email: string; role: Role };
        if (decoded) {
          if (requiredRoles.includes(decoded.role)) {
            return true;
          } else {
            throw new UnauthorizedException('Invalid Role');
          }
        } else {
          console.log('Invalid Token');
          throw new UnauthorizedException('Invalid Token');
        }
      } else {
        console.log('Access Token Not Found');
        throw new ForbiddenException('Access Token Not Found');
      }
    } catch (error) {
      throw error;
    }
  }
}

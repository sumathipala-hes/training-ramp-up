import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    console.log('requiredRoles :' + requiredRoles);

    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.cookie?.split('=')[1];

    console.log('accessToken :' + accessToken);

    if (!accessToken) {
      throw new ForbiddenException('Access token not found');
    }

    try {
      if (requiredRoles.includes(accessToken)) {
        return true;
      }
      throw new ForbiddenException('Forbidden');
    } catch (error) {
      throw new UnauthorizedException('Invalid accessToken');
    }
  }
}

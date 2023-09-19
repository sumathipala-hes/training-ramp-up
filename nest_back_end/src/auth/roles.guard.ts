import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
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
    const accessRole = request.headers.cookie?.split('=')[1];

    console.log('accessRole :' + accessRole);

    if (!accessRole) {
      throw new HttpException('Role not found', HttpStatus.UNAUTHORIZED);
    }

    try {
      if (requiredRoles.includes(accessRole)) {
        return true;
      }
      throw new HttpException('Invalid role', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}

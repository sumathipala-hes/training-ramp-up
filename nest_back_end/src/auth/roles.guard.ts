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
import { jwtConstants } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

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
    console.log('requiredRoles :' + requiredRoles);

    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.cookie?.split('=')[1];

    console.log('accessToken :' + accessToken);

    if (!accessToken) {
      console.log('Access Token Not Found');
      throw new HttpException(
        'Access Token Not Found',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const decoded = (await this.jwtService.verify(accessToken, {
        secret: jwtConstants.secret,
      })) as { userEmail: string; role: Role };
      if (decoded) {
        if (requiredRoles.includes(decoded.role)) {
          return true;
        } else {
          console.log('Invalid Role');
          throw new HttpException('Invalid Role', HttpStatus.FORBIDDEN);
        }
      } else {
        console.log('Invalid Token');
        throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}

// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     console.log('requiredRoles :' + requiredRoles);

//     const request = context.switchToHttp().getRequest();
//     const accessRole = request.headers.cookie?.split('=')[1];

//     console.log('accessRole :' + accessRole);

//     if (!accessRole) {
//       throw new HttpException('Role not found', HttpStatus.UNAUTHORIZED);
//     }

//     try {
//       if (requiredRoles.includes(accessRole)) {
//         return true;
//       }
//       throw new HttpException('Invalid role', HttpStatus.FORBIDDEN);
//     } catch (error) {
//       throw new HttpException(
//         error.message,
//         error?.status ?? HttpStatus.BAD_REQUEST,
//       );
//     }
//   }
// }

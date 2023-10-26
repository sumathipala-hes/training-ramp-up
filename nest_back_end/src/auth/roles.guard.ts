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
    const request = context.switchToHttp().getRequest();
    const cookies = request.headers.cookie; // The entire cookie string

    // Split the cookie string by semicolon
    const cookieArray = cookies.split(';');

    // Search for the token named 'accessToken'
    let accessToken = '';
    for (const cookie of cookieArray) {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'accessToken') {
        accessToken = value;
        break;
      }
    }

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

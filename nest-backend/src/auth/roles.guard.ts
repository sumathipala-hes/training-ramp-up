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
    const accessToken = req.headers.cookie?.split('=')[1];
    console.log(accessToken);

    try {
      if (accessToken) {
        const decoded = (await this.jwtService.verify(accessToken, {
          secret: jwtConstants.secretKey,
        })) as { email: string; role: Role };
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
      } else {
        console.log('Access Token Not Found');
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

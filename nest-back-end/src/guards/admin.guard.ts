/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants/constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.secret,
      });

      request['user'] = payload;
      const user = await this.usersService.findOne(request.user.id);
      console.log(user.roles[0]);
      if (user.roles[0] !== 'ADMIN') {
        return response
          .status(402)
          .json({ message: 'Youre Not an Admin to Access this Route' });
      }
    } catch (err) {
      if (refreshToken) {
        return response
          .status(403)
          .json({ message: 'Try Refreshing the Access Token' });
      }
      throw new UnauthorizedException();
    }
    return true;
  }
}

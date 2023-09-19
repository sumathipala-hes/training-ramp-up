import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('api/v1/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    console.log(createUserDto);

    const user = await this.authService.signIn(createUserDto);

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: true,
    });
    console.log(user.accessToken, user.refreshToken);

    res.status(200).json({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signOut')
  async signOut(@Res() res: Response): Promise<void> {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.removeHeader('Set-Cookie');
    res.status(200).json({ message: 'Sign out successfully' });
  }
}

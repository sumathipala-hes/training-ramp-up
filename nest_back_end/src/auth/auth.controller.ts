import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
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
      maxAge: 1000 * 60,
      httpOnly: true,
      secure: true,
    });
    res.cookie('accessToken', user.accessToken, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      secure: true,
    });
    console.log(user.accessToken, user.refreshToken);

    res.status(200).json({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      message: 'Sign in Successfully',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('refreshToken')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    const user = await this.authService.generateNewAccessToken(
      req.headers.cookie.split('=')[1],
    );
    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 1000 * 60,
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({
      refreshToken: user.refreshToken,
      message: 'Genarate Refresh Token Successfully',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('signOut/email')
  async signOut(@Res() res: Response): Promise<void> {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.cookie('refreshToken', '', {
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });
    res.cookie('accessToken', '', {
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ message: 'Sign out successfully' });
  }
}

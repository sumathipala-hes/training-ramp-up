import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(
    @Body() signInDto: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const token = await this.authService.signInUser(
        signInDto.email,
        signInDto.password,
      );

      res.cookie('accessToken', token.accessToken, {
        maxAge: 1000 * 60 * 5,
        httpOnly: true,
      });

      res.cookie('refreshToken', token.refreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });

      res.status(200).json({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    } catch (error: any) {
      if (error.message === 'User not found') {
        return res.status(400).json({ message: 'User not found' });
      } else {
        return res.status(500).json({ message: 'An error occurred' });
      }
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('signOut')
  async signOut(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.status(200).json({ message: 'Sign out successfully' });
    } catch (error: any) {
      res.status(500).json(error);
    }
  }
}

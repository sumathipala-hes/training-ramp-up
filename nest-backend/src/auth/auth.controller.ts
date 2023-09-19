import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('refreshToken')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    const refreshToken = req.headers.cookie.split('=')[1];
    const newAccessToken =
      await this.authService.generateNewAccessToken(refreshToken);
    res.cookie('accessToken', newAccessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
    res.status(200).json({ accessToken: newAccessToken });
  }
}

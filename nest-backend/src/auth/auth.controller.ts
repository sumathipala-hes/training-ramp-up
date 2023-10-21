import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('refreshToken')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    const refreshToken = req.headers.cookie.split('=')[1];
    const newAccessToken =
      await this.authService.generateNewAccessToken(refreshToken);
    res.cookie('accessToken', newAccessToken, {
      maxAge: 1000 * 60,
      httpOnly: true,
    });
    res.status(200).json({ message: 'Refresh Token Success' });
  }

  @Post('authorize')
  async authorize(@Req() req: Request, @Res() res: Response): Promise<void> {
    const tokenParts = req.headers.cookie?.split('; ');

    let refreshToken = null;

    for (const part of tokenParts) {
      if (part.startsWith('refreshToken=')) {
        refreshToken = part.substring('refreshToken='.length);
        break;
      }
    }
    const data = await this.authService.authorizeUser(refreshToken);
    res.status(200).json({ message: 'Authorized', data: { data } });
  }
}

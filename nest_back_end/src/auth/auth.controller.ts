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
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('api/v1/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
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

      return res.status(200).json({
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

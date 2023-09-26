import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './user.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { userRoles } from 'src/utils';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe()) user: UserDto,
  ) {
    try {
      await this.userService.saveUser(req, user);
      return res.status(200).json({
        status: 200,
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          status: 400,
          error: err.message,
        });
      } else {
        return res.status(500).json({
          status: 500,
          error: 'An unknown error occurred.',
        });
      }
    }
  }

  @Post('auth')
  @Roles([userRoles.admin, userRoles.user])
  async authUser(@Req() req: Request, @Res() res: Response) {
    try {
      const token = await this.userService.fetchUser(req);
      if (token) {
        res.status(200).json({
          status: 200,
          data: token,
        });
      } else {
        res.status(401).json({
          status: 401,
          error: 'Authentication failed. Invalid token or token not provided.',
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(401).json({
          status: 401,
          error: err.message,
        });
      } else {
        res.status(500).json({
          status: 500,
          error: 'An unknown error occurred.',
        });
      }
    }
  }

  //create new access token
  @Post('auth-token')
  @Roles([userRoles.admin, userRoles.user])
  async newAccessToken(@Req() req: Request, @Res() res: Response) {
    try {
      const token = await this.userService.createAccessToken(req);
      if (token) {
        res.cookie('token', token.token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        });
        res.status(200).json({
          status: 200,
          data: token.data,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(401).json({
          status: 401,
          error: err.message,
        });
      } else {
        res.status(500).json({
          status: 500,
          error: 'An unknown error occurred.',
        });
      }
    }
  }

  //authenticate user
  @Post('login')
  async validateUser(@Req() req: Request, @Res() res: Response) {
    try {
      const tokens = await this.userService.authenticateUser(req);
      if (tokens) {
        // Set the HTTP-only cookie
        res.cookie('token', tokens.token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        });
        res.cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        });
        res.status(200).json({
          status: 200,
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'The provided username or password is invalid',
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          status: 400,
          error: err.message,
        });
      } else {
        res.status(500).json({
          status: 500,
          error: 'An unknown error occurred.',
        });
      }
    }
  }

  //logout user
  @Get('log-out')
  @Roles([userRoles.admin, userRoles.user])
  async logoutUser(@Req() req: Request, @Res() res: Response) {
    try {
      res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0),
      });
      res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0),
      });
      res.status(200).json({
        status: 200,
        message: 'Logged out successfully.',
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: 'An error occurred during logout.',
      });
    }
  }
}

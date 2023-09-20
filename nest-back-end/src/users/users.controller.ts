import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/sign-in-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/sign-up')
  signup(@Body() body: CreateUserDto, @Res() res: Response) {
    return this.authService.signup(
      body.email,
      body.userName,
      body.password,
      res,
    );
  }

  @Post('/sign-in')
  signin(@Body() body: SignInDto, @Res() res: Response) {
    return this.authService.signin(body.email, body.password, res);
  }

  @Post('/refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Patch('/:id')
  updateUserRole(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Post('/log-out')
  logOutUser(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAllUsers() {
    return this.usersService.find();
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/v1/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/add')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Array<CreateUserDto>> {
    return await this.usersService.findAll();
  }

  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(email, updateUserDto);
  }

  @Delete('del/:id')
  async remove(@Param('id') email: string) {
    return await this.usersService.remove(email);
  }

  @Post('signIn')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(createUserDto);
    console.log(tokens);
    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }

  @Delete('signOut')
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logout Success' });
  }
}

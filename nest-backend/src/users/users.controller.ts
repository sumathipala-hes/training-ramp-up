import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enum/role.enum';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('api/v1/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Roles(Role.ADMIN)
  @Post('/add')
  async create(@Body() createUserDto: CreateUserDto): Promise<InsertResult> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Array<CreateUserDto>> {
    return await this.usersService.findAll();
  }

  // @Roles(Role.ADMIN)
  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersService.update(email, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @Delete('del/:id')
  async remove(@Param('id') email: string): Promise<DeleteResult> {
    return await this.usersService.remove(email);
  }

  @Post('/signIn')
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
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
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logout Success' });
  }
}

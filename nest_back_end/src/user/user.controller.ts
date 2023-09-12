import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Get()
  async retrieveAllUsers(@Res() res: Response) {
    try {
      const users = await this.userService.retrieveAllUsers();
      return res.status(HttpStatus.OK).json({ data: users });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':userEmail')
  async update(
    @Param('userEmail') userEmail: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userEmail, updateUserDto);
  }

  @Delete(':userEmail')
  async remove(@Param('userEmail') userEmail: string) {
    return this.userService.deleteUser(userEmail);
  }
}

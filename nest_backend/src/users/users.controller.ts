import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Response } from 'express';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enum/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user: InsertResult =
        await this.usersService.createUser(createUserDto);
      res.status(HttpStatus.CREATED).json({
        message: 'User created successfully',
        data: user,
      });
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error creating user',
        error: error.message,
      });
    }
  }

  @Roles(Role.Admin)
  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      await this.usersService.findAllUsers().then((users) => {
        res.status(HttpStatus.OK).json({
          message: 'Users found successfully',
          data: users,
        });
      });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'User not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error finding users',
          error: error.message,
        });
      }
    }
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      this.usersService.findOneUser(id).then((user) => {
        res.status(HttpStatus.OK).json({
          message: 'User found successfully',
          data: user,
        });
      });
    } catch (err: any) {
      if (err.message === 'User not found') {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'User not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error finding user',
          error: err.message,
        });
      }
    }
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const updatedUser: UpdateResult = await this.usersService.updateUser(
        id,
        updateUserDto,
      );
      res.status(HttpStatus.OK).json({
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (err: any) {
      if (err.message === 'User not found') {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'User not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error updating user',
          error: err.message,
        });
      }
    }
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const deletedUser: DeleteResult = await this.usersService.removeUser(id);
      res.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        data: deletedUser,
      });
    } catch (err: any) {
      if (err.message === 'User not found') {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'User not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error deleting user',
          error: err.message,
        });
      }
    }
  }
}

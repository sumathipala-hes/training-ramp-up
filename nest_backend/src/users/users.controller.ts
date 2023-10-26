import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
// import { Roles } from '../auth/roles.decorator';
// import { Role } from '../enum/role.enum';
import { UserResponseData } from './dto/response-data';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<InsertResult> {
    return await this.usersService.createUser(createUserDto);
  }

  // @Roles(Role.Admin)
  @Get()
  async findAll(): Promise<UserResponseData> {
    return await this.usersService.findAllUsers();
  }

  // @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOneUser(id);
  }

  // @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  // @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.usersService.removeUser(id);
  }
}

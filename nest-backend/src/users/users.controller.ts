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

@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/add')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Array<CreateUserDto>> {
    return this.usersService.findAll();
  }

  @Put(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete('del/:id')
  remove(@Param('id') email: string) {
    return this.usersService.remove(email);
  }
}

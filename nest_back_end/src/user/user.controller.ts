import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.retrieveAllUsers();
  }

  @Put(':userEmail')
  update(
    @Param('userEmail') userEmail: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userEmail, updateUserDto);
  }

  @Delete(':userEmail')
  remove(@Param('userEmail') userEmail: string) {
    return this.userService.deleteUser(userEmail);
  }
}

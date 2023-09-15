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
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Get()
  async retrieveAllUsers(): Promise<{ data: CreateUserDto[] }> {
    return (await this.userService.retrieveAllUsers()) as {
      data: CreateUserDto[];
    };
  }

  @Put(':userEmail')
  @Roles(Role.Admin)
  async update(
    @Param('userEmail') userEmail: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userEmail, updateUserDto);
  }

  @Delete(':userEmail')
  @Roles(Role.Admin)
  async remove(@Param('userEmail') userEmail: string) {
    return this.userService.deleteUser(userEmail);
  }
}

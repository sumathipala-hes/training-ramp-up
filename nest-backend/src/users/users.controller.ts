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
import { AuthService } from 'src/auth/auth.service';

@Controller('api/v1/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/add')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Array<CreateUserDto>> {
    return this.usersService.findAll();
  }

  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete('del/:id')
  async remove(@Param('id') email: string) {
    return this.usersService.remove(email);
  }

  @Post('signIn')
  async signIn(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.authService.signIn(createUserDto);
  }

  @Delete('signOut')
  async signOut() {}
}

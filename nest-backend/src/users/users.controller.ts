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
  constructor(private readonly usersService: UsersService,
   private readonly authService:AuthService ) {}

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
  async signIn(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const tokens = await this.authService.signIn(createUserDto);
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return res.send(tokens);
  }

  @Delete('signOut')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: 'Sign Out Successfully' };
  }
}

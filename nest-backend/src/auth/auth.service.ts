import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { encrypt } from 'src/utils/password.util';
import { Repository } from 'typeorm';
import { jwtConstants } from './auth.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(

    private jwtService: JwtService,
  ) {}
  async signIn(createUserDto: CreateUserDto): Promise<any> {
    try {
      // const user = await this.usersService.findOne({
      //   where: {
      //     email: createUserDto.email,
      //   },
      // });
      const user = {password:'', email:'', role:''};
      if (user) {
        if (user.password == encrypt(createUserDto.password)) {
          const accessToken = this.jwtService.sign(
            { email: user.email, role: user.role },
            { secret: jwtConstants.secretKey!, expiresIn: '5h' },
          );
          const refreshToken = this.jwtService.sign(
            { email: user.email },
            { secret: jwtConstants.secretKey, expiresIn: '7d' },
          );
          return { accessToken: accessToken, refreshToken: refreshToken };
        } else {
          throw new Error('Password not match');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { encrypt } from 'src/utils/password.util';
import { jwtConstants } from './auth.constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      console.log('Password not match0');
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
          console.log('Password not match');
          throw new Error('Password not match');
        }
      } else {
        console.log('Password not match1');
        throw new Error('User not found');
      }
    } catch (error) {
      console.log('Password not match2');
      throw new Error(error.message);
    }
  }
}

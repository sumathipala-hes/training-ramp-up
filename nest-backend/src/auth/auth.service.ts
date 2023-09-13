import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { jwtConstants } from './auth.constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { encrypt } from '../utils/password.util';

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

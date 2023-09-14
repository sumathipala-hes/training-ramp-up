import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { jwtConstants } from './auth.constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { encrypt } from '../utils/password.util';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(createUserDto: CreateUserDto): Promise<TokenDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (user) {
        if (user.password == encrypt(createUserDto.password)) {
          const tokens = new TokenDto();
          tokens.accessToken = this.jwtService.sign(
            { email: user.email, role: user.role.toLowerCase() },
            { secret: jwtConstants.secretKey!, expiresIn: '5h' },
          );
          tokens.refreshToken = this.jwtService.sign(
            { email: user.email },
            { secret: jwtConstants.secretKey, expiresIn: '7d' },
          );
          return tokens;
        } else {
          throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

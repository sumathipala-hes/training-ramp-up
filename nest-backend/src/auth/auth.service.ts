import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { jwtConstants } from './auth.constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { encrypt } from '../utils/password.util';
import { TokenDto } from './dto/token.dto';
import { Role } from 'src/enum/role.enum';

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
            { secret: jwtConstants.secretKey!, expiresIn: '1m' },
          );
          tokens.refreshToken = this.jwtService.sign(
            { email: user.email, role: user.role.toLowerCase() },
            { secret: jwtConstants.secretKey, expiresIn: '7d' },
          );
          return tokens;
        } else {
          throw new HttpException('Password Not Match', HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateNewAccessToken(refreshToken: string): Promise<String> {
    try {
      const decoded = (await this.jwtService.verify(refreshToken, {
        secret: jwtConstants.secretKey,
      })) as { email: string; role: Role };
      if (decoded) {
        console.log('New Access Token Generated');
        return this.jwtService.sign(
          { email: decoded.email, role: decoded.role },
          { secret: jwtConstants.secretKey, expiresIn: '1m' },
        );
      } else {
        throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async authorizeUser(refreshToken: string): Promise<any> {
    try {
      const decoded = (await this.jwtService.verify(refreshToken, {
        secret: jwtConstants.secretKey,
      })) as { email: string; role: Role };
      if (decoded) {
        return { email: decoded.email, role: decoded.role };
      } else {
        throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

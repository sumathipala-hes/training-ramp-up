import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { encryptPassword } from '../util/password.util';
import { Repository } from 'typeorm';
import { jwtConstants } from './auth.constants';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(createUserDto: CreateUserDto): Promise<TokenDto> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          userEmail: createUserDto.userEmail,
        },
      });

      console.log(
        'userEmail :' +
          createUserDto.userEmail +
          '  ' +
          'userPassword :' +
          user.userPassword,
      );

      if (!user) {
        throw new HttpException('No user found.', HttpStatus.NOT_FOUND);
      }

      const isPasswordValid =
        user.userPassword == encryptPassword(createUserDto.userPassword);

      if (!isPasswordValid) {
        throw new HttpException('No password match.', HttpStatus.NOT_FOUND);
      }

      const tokenDto = new TokenDto();
      tokenDto.accessToken = this.jwtService.sign(
        { userEmail: user.userEmail, role: user.role },
        { secret: jwtConstants.secret!, expiresIn: '5h' },
      );

      tokenDto.refreshToken = this.jwtService.sign(
        { userEmail: user.userEmail, role: user.role },
        { secret: jwtConstants.secret!, expiresIn: '24h' },
      );

      return tokenDto;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}

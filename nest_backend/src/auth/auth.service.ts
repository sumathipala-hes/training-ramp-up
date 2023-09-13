import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { encrypt } from '../util/encrypted.decrypted.util';
import { Repository } from 'typeorm/repository/Repository';
import { jwtConfig } from '../config/jwt.config';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signInUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    password = encrypt(password);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, roleType: user.roleType };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConfig.accessExpiresIn,
        secret: jwtConfig.secretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConfig.refreshExpiresIn,
        secret: jwtConfig.refreshKey,
      }),
    };
  }
}

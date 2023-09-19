import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { encryptPassword } from 'src/util/encrypted.decrypted.util';
import { Repository } from 'typeorm';
import { jwtConstants } from './auth.constants';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
      ) {}
    
      async signIn(
        createUserDto: CreateUserDto,
      ): Promise<{ accessToken: string; refreshToken: string }> {
        try {
          const user = await this.usersRepository.findOne({
            where: {
              userEmail: createUserDto.userEmail,
            },
          });
    
          console.log("userEmail :"+createUserDto.userEmail);
          console.log("userPassword :"+user.userPassword);
    
          if (!user) {
            throw new Error('User not found');
          }
    
          const isPasswordValid =
            user.userPassword == encryptPassword(createUserDto.userPassword);
    
          if (!isPasswordValid) {
            throw new Error('Password not match');
          }
    
          const accessToken = this.jwtService.sign(
            { userEmail: user.userEmail, role: user.role },
            { secret: jwtConstants.secret!, expiresIn: '5h' },
          );
    
          const refreshToken = this.jwtService.sign(
            { userEmail: user.userEmail, role: user.role },
            { secret: jwtConstants.secret!, expiresIn: '24h' },
          );
    
          return { accessToken, refreshToken };
        } catch (error) {
          throw new Error(error.message);
        }
      }
}

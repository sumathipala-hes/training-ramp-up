import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { encrypt } from 'src/utils/password.util';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.insert(createUserDto as User);
  }

  findAll() {
    const users = this.userRepository.find({ order: { email: 'DESC' } });
    if (!users) {
      throw new Error('No Users Found');
    }
    return users;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto as User);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async signInUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      password = encrypt(password);

      if (user) {
        if (user.password == password) {
          const accessToken = this.jwtService.sign(
            { email: user.email, role: user.role },
            { secret: jwtConfig.secretKey!, expiresIn: '5h' },
          );
          const refreshToken = this.jwtService.sign(
            { email: user.email },
            { secret: jwtConfig.secretKey, expiresIn: '7d' },
          );

          return { accessToken: accessToken, refreshToken: refreshToken };
        } else {
          throw new Error('Password not match');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }
}

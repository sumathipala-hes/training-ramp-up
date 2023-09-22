/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from "jsonwebtoken";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto): Promise<{ accessToken: string; refreshToken: string }> {
        const { username, password, role } = registerDto;
        let user = await this.userRepository.findOne({ where: { username: username } });
        if (user) {
          throw new Error('User already exists');
        }
        const hash = await bcrypt.hash(password, 10);
        user = this.userRepository.create({
          username: username,
          password: hash,
          role: role,
        });
        await this.userRepository.save(user);
        const tokens = this.createTokens(user);
        return tokens;
      }

    async login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
        const { username, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { username: username } });
        if (!user) {
            throw new Error('The email address entered is not connected to an account');
          }
        const dbPassword = user.password;
        const match = await bcrypt.compare(password, dbPassword);
    if (!match) {
      throw new Error('Wrong Username and Password Combination');
    }
    const tokens = this.createTokens(user);
    return tokens;
    }

    async getUserRole(req: Request): Promise<string> {
        const accessToken = req.cookies['access-token'] as string;
        if (!accessToken) {
          throw new Error('User is not logged in. Cannot fetch the role.');
        }
        const decodedToken = this.jwtService.decode(accessToken) as JwtPayload;
        return decodedToken.role;
    }

    createTokens(user: User): { accessToken: string; refreshToken: string } {
        const accessToken = this.jwtService.sign(
          { username: user.username, id: user.id, role: user.role },
          { secret: process.env.JWT_SECRET as string, expiresIn: '60m'}
        );
        const refreshToken = this.jwtService.sign(
          { username: user.username, id: user.id, role: user.role },
          { secret: process.env.JWT_REFRESH_SECRET as string, expiresIn: '30d' },
        );
        return { accessToken, refreshToken };
      }       
}
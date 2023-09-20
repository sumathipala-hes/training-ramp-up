/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { Request, Response } from 'express';

@Injectable()
export class MockAuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService,
  ) {}

  async signup(
    email: string,
    userName: string,
    password: string,
    res: Response,
  ) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('Email is In Use');
    }

    const newUser = await this.usersService.create(email, userName, password);

    this.createSendToken(newUser, res);

    return newUser;
  }

  async signin(email: string, password: string, res: Response) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException('user not found with this email');

    if (!user || !this.correctPassword(password, user.password)) {
      throw new BadRequestException('Email or Password is Incorrect');
    }

    this.createSendToken(user, res);

    return user;
  }

  correctPassword(candidatePassword: string, userPassword: string): boolean {
    return candidatePassword === userPassword;
  }

  logout(res: Response) {
    console.log('Log Out Controller Reached Successfully');
    // Set the expiration time of both access and refresh tokens to "right now."
    res.cookie('accessToken', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: false,
    });

    // Expire the refresh token cookie
    res.cookie('refreshToken', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const verifiedJWT = await this.jwtservice.verifyAsync(refreshToken);
    if (!verifiedJWT) {
      throw new BadRequestException('Token cannot be verifiable');
    }
    const decoded: JwtPayload = jwtDecode(refreshToken) as JwtPayload;
    const user = await this.usersService.findOne(decoded.id);
    this.createSendToken(user, res);
  }

  signToken = async (id: number, email: string) => {
    const refreshToken = await this.jwtservice.signAsync({ id });
    const accessToken = await this.jwtservice.signAsync({ id, email });

    return { accessToken, refreshToken };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createSendToken(user: User, res: Response) {
    // Do nothing, this is a mock
  }
}

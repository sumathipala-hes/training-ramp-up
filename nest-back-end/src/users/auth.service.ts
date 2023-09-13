/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
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

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new BadRequestException('Email or Password is Incorrect');
    }

    this.createSendToken(user, res);

    return user;
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

  createSendToken = async (user: User, res: Response) => {
    console.log(user);
    const token = await this.signToken(user.id, user.email);

    const cookieOptions = {
      expires: new Date(Date.now() + 300000),
      httpOnly: true,
      secure: false,
    };

    res.cookie('accessToken', token.accessToken, cookieOptions);
    res.cookie('refreshToken', token.refreshToken, {
      expires: new Date(Date.now() + 300000000), //1year
      httpOnly: true,
    });

    res.status(200).json({
      status: 'success',
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      data: {
        user,
      },
    });
  };
}

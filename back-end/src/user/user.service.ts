import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';
interface RequestType {
  cookies: { token: string; refreshToken: string };
}

interface loginType {
  body: { username: string; password: string };
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(req: RequestType, body: UserDto): Promise<void> {
    const username = body.username;
    const name = body.name;
    const role = body.role;
    const password = body.password;
    const token = req.cookies.token;

    const saltRounds = 11;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.role = role;
    user.name = name;

    if (token) {
      const refreshToken = await this.validateRefToken(req);
      if (refreshToken) {
        const accessToken = (await this.validateAccessToken(
          req,
        )) as jwt.JwtPayload;
        if (accessToken.role === 'admin') {
          await this.userRepository.insert(user as User);
        }
      }
    } else {
      user.role = 'user';
      await this.userRepository.insert(user as User);
    }
  }

  async fetchUser(
    req: RequestType,
  ): Promise<{ name: string; role: string } | undefined> {
    const refreshToken = await this.validateRefToken(req);
    if (refreshToken) {
      const accessToken = (await this.validateAccessToken(
        req,
      )) as jwt.JwtPayload;
      return { name: accessToken.name, role: accessToken.role };
    }
    return undefined; // Return undefined if refresh token validation fails
  }

  //authenticate user
  async authenticateUser(req: loginType) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await this.userRepository.findOneBy({
      username: username,
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const userData: jwt.JwtPayload = {
          name: user.name,
          role: user.role,
          username: user.username,
        };

        const token = jwt.sign(userData, process.env.JWT_SECRET as string, {
          expiresIn: '10m',
        });
        const refreshToken = jwt.sign(
          userData,
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' },
        );

        return { token, refreshToken };
      } else {
        return false;
      }
    } else {
      throw new Error('The provided username or password is invalid');
    }
  }

  async createAccessToken(req: RequestType) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const decodedRefToken = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string,
      ) as jwt.JwtPayload;

      if (decodedRefToken) {
        const user = await this.userRepository.findOneBy({
          username: decodedRefToken.username,
        });

        if (user) {
          const token = jwt.sign(
            { name: user.name, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '10m' },
          );
          return { token, data: { name: user.name, role: user.role } };
        } else {
          throw new Error('Invalid refresh token');
        }
      } else {
        return { status: 400, data: '' };
      }
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  }

  async validateRefToken(req: RequestType) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const decodedRefToken = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string,
      );

      return decodedRefToken;
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  }
  async validateAccessToken(req: RequestType) {
    try {
      const accessToken = req.cookies.token;
      const decodedAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string,
      );

      return decodedAccessToken;
    } catch (err) {
      throw new Error('Invalid access token');
    }
  }
}

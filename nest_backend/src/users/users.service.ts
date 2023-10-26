import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { decrypt, encrypt } from '../util/securepassword.util';
import { UserResponseData } from './dto/response-data';
import { sendNotification } from 'src/util/notification.util';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private socketService: SocketService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      createUserDto.password = encrypt(createUserDto.password);
      const newUser: InsertResult =
        await this.userRepository.insert(createUserDto);
      sendNotification('User', 'User created successfully');
      this.socketService.sendNotification('User created successfully');
      return newUser;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllUsers(): Promise<UserResponseData> {
    try {
      const users: User[] = await this.userRepository.find({
        order: { email: 'DESC' },
      });

      if (users.length === 0) {
        throw new HttpException('No users found.', HttpStatus.NOT_FOUND);
      }

      users.forEach((user) => {
        user.password = decrypt(user.password);
      });

      return {
        message: 'Users found successfully',
        data: users,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneUser(search: string): Promise<UserResponseData> {
    try {
      const user: User = await this.userRepository.findOne({
        where: [
          { email: search },
          { name: search },
          { address: search },
          { mobileNumber: search },
        ],
      });

      if (!user) {
        throw new HttpException('No user found.', HttpStatus.NOT_FOUND);
      }

      user.password = decrypt(user.password);

      return {
        message: 'User found successfully',
        data: [user],
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      updateUserDto.password = encrypt(updateUserDto.password);

      const updatedUser: UpdateResult = await this.userRepository.update(
        email,
        updateUserDto,
      );

      if (updatedUser.affected === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      sendNotification('User', 'User updated successfully');
      this.socketService.sendNotification('User updated successfully');
      return updatedUser;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeUser(email: string): Promise<DeleteResult> {
    try {
      const deletedUser: DeleteResult = await this.userRepository.delete(email);

      if (deletedUser.affected === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      sendNotification('User', 'User deleted successfully');
      this.socketService.sendNotification('User deleted successfully');
      return deletedUser;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}

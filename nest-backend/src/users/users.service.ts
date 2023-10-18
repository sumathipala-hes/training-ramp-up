import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { decrypt, encrypt } from '../utils/password.util';
import { sendNotification } from '../utils/notification.util';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly socketService: SocketService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      const savedUser = await this.userRepository.insert({
        ...createUserDto,
        password: encrypt(createUserDto.password),
      } as User);
      this.socketService.sendNotification('A new user has been created..!');
      return savedUser;
    } catch (error) {
      sendNotification('Error', error.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Array<CreateUserDto>> {
    try {
      const users = await this.userRepository.find({
        order: { email: 'DESC' },
      });
      if (!users) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      users.forEach((user) => {
        user.password = decrypt(user.password);
      });
      return users;
    } catch (error) {
      this.socketService.sendNotification('User fetching failed..!');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const updatedUser = await this.userRepository.update(id, {
        ...updateUserDto,
        password: encrypt(updateUserDto.password),
      } as User);
      this.socketService.sendNotification('A user has been updated..!');
      return updatedUser;
    } catch (error) {
      sendNotification('Error', 'User update failed..!');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(email: string): Promise<DeleteResult> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        this.socketService.sendNotification('User deletion failed..!');
        throw new Error('User not found');
      }
      const deletedUser = await this.userRepository.delete(email);
      this.socketService.sendNotification('A user has been deleted..!');
      return deletedUser;
    } catch (error) {
      sendNotification('Error', 'User deletion failed..!');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

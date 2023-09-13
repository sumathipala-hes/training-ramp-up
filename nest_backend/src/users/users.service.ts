import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { decrypt, encrypt } from '../util/encrypted.decrypted.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      createUserDto.password = encrypt(createUserDto.password);
      const newUser: InsertResult =
        await this.userRepository.insert(createUserDto);
      return newUser;
    } catch (err) {
      throw new Error('Failed to create user.');
    }
  }

  async findAllUsers(): Promise<Array<User>> {
    try {
      const users: Array<User> = await this.userRepository.find({
        order: { email: 'DESC' },
      });

      if (users.length === 0) {
        throw new Error('No users found.');
      }

      users.forEach((user) => {
        user.password = decrypt(user.password);
      });

      return users;
    } catch (err) {
      throw new Error('Failed to fetch users.');
    }
  }

  async findAllUsers(search: string): Promise<User> {
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
        throw new Error('No user found.');
      }

      user.password = decrypt(user.password);

      return user;
    } catch (err) {
      throw new Error('Failed to fetch user.');
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
        throw new Error('User not found');
      }

      return updatedUser;
    } catch (err) {
      throw new Error('Failed to update user.');
    }
  }

  async removeUser(email: string): Promise<DeleteResult> {
    try {
      const deletedUser: DeleteResult = await this.userRepository.delete(email);

      if (deletedUser.affected === 0) {
        throw new Error('User not found');
      }

      return deletedUser;
    } catch (err) {
      throw new Error('Failed to delete user.');
    }
  }
}

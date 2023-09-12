import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      // Insert the users into the database
      const newUser: InsertResult = await this.userRepository.insert(
        createUserDto as User,
      );
      return newUser;
    } catch (error) {
      // Handle and rethrow the error
      throw error;
    }
  }

  async retrieveAllUsers(): Promise<CreateUserDto[]> {
    try {
      // Retrieve all the users from the database
      const users: CreateUserDto[] = await this.userRepository.find({
        order: { userEmail: 'DESC' },
      });
      if (!users) {
        throw new Error('No users found.');
      }
      return users;
    } catch (error) {
      // Handle and rethrow the error
      throw error;
    }
  }

  async updateUser(
    userEmail: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      // Update the user in the database
      const updatedUser: UpdateResult = await this.userRepository.update(
        userEmail,
        updateUserDto as User,
      );
      if (updatedUser.affected === 1) {
        // If the user is updated
        updatedUser.raw = updateUserDto;
      } else {
        throw new Error('User not found.');
      }
      return updatedUser;
    } catch (error) {
      // Handle and rethrow the error
      throw error;
    }
  }

  async deleteUser(userEmail: string): Promise<DeleteResult> {
    try {
      const deletedUser: DeleteResult =
        await this.userRepository.delete(userEmail);
      if (deletedUser.affected !== 1) {
        throw new Error('User not found.');
      }
      return deletedUser;
    } catch (error) {
      // Handle and rethrow the error
      throw error;
    }
  }
}

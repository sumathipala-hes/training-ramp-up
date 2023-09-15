import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  decryptPassword,
  encryptPassword,
} from 'src/util/encrypted.decrypted.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      const encryptedPassword = encryptPassword(createUserDto.userPassword);

      // Create a new user object with the encrypted password
      const userWithEncryptedPassword = {
        ...createUserDto,
        userPassword: encryptedPassword,
      };

      // Insert the users into the database
      const newUser: InsertResult = await this.userRepository.insert(
        userWithEncryptedPassword as User,
      );
      return newUser;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async retrieveAllUsers(): Promise<{ data: User[] }> {
    try {
      // Retrieve all the users from the database
      const users: User[] = await this.userRepository.find({
        order: { userEmail: 'DESC' },
      });
      // Decrypt the passwords
      users.forEach((user) => {
        user.userPassword = decryptPassword(user.userPassword);
      });

      if (!users) {
        throw new HttpException('No users found.', HttpStatus.NOT_FOUND);
      }
      return { data: users };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(
    userEmail: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const encryptedPassword = encryptPassword(updateUserDto.userPassword);

      // Upadate user object with the encrypted password
      const userWithEncryptedPassword = {
        ...updateUserDto,
        userPassword: encryptedPassword,
      };

      // Update the user in the database
      const updatedUser: UpdateResult = await this.userRepository.update(
        userEmail,
        userWithEncryptedPassword as User,
      );
      if (updatedUser.affected === 1) {
        // If the user is updated
        updatedUser.raw = updateUserDto;
      } else {
        throw new HttpException('No users found.', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUser(userEmail: string): Promise<DeleteResult> {
    try {
      const deletedUser: DeleteResult =
        await this.userRepository.delete(userEmail);
      if (deletedUser.affected !== 1) {
        throw new HttpException('No users found.', HttpStatus.NOT_FOUND);
      }
      return deletedUser;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}

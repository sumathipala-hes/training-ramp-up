import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { decrypt, encrypt } from 'src/utils/password.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      return await this.userRepository.insert({
        ...createUserDto,
        password: encrypt(createUserDto.password),
      } as User);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<Array<CreateUserDto>> {
    try {
      const users = await this.userRepository.find({
        order: { email: 'DESC' },
      });
      if (!users) {
        throw new Error('No Users Found');
      }
      users.forEach((user) => {
        user.password = decrypt(user.password);
      });
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      updateUserDto.password = encrypt(updateUserDto.password);
      return await this.userRepository.update(id, {
        ...updateUserDto,
        password: encrypt(updateUserDto.password),
      } as User);
    } catch (error) {
      throw new Error(error.message);
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
        throw new Error('User not found');
      }
      return await this.userRepository.delete(email);
    } catch (error) {}
  }
}

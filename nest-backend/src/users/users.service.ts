import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private studentRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.studentRepository.insert(createUserDto as User);
  }

  findAll() {
    const users = this.studentRepository.find({ order: { email: 'DESC' } });
    if (!users) {
      throw new Error('No Users Found');
    }
    return users;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.studentRepository.update(id, updateUserDto as User);
  }

  remove(id: number) {
    return this.studentRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, userName: string, password: string) {
    const user = this.repo.create({ email, userName, password });

    return await this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  find() {
    return this.repo.find();
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });

    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not Found');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not Found');
    }

    return this.repo.remove(user);
  }
}

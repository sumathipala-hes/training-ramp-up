import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly socketGateWay: NotificationGateway,
  ) {}

  async create(email: string, userName: string, password: string) {
    const user = this.repo.create({ email, userName, password });
    this.socketGateWay.server.emit('signup', 'A new User has been created');

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

    this.socketGateWay.server.emit(
      'deleteUser',
      `A User has been deleted with id ${id}`,
    );

    return this.repo.remove(user);
  }
}

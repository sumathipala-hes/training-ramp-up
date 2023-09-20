import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repo: Repository<Student>,
    private readonly socketGateWay: NotificationGateway,
  ) {}

  create(
    id: number,
    name: string,
    age: string,
    date_of_birth: Date,
    gender: string,
    mobile_number: number,
    address: string,
  ) {
    const user = this.repo.create({
      id,
      name,
      age,
      date_of_birth,
      gender,
      mobile_number,
      address,
    });
    this.socketGateWay.server.emit(
      'newStudent',
      `A New Student with the name of ${name} has been created`,
    );
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  find() {
    return this.repo.find();
  }

  async update(id: number, attrs: Partial<Student>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('student not Found');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('student not Found');
    }

    this.socketGateWay.server.emit(
      'deleteStudent',
      `Student with id of ${id} has been removed`,
    );

    return this.repo.remove(user);
  }
}

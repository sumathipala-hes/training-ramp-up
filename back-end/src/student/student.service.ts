// student.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../models/student.entity';
import { SocketGateway } from 'src/socket/socket.gateway';
import { calculateAge } from 'src/utils';
import { StudentDTO } from './student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly socketGateway: SocketGateway,
  ) {}

  async fetchStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async saveStudent(req: StudentDTO) {
    const id = req.id;
    const name = req.name;
    const gender = req.gender;
    const address = req.address;
    const mobile = req.mobile;
    const birthday = req.birthday;
    const age = calculateAge(new Date(req.birthday));

    const student = new Student();
    student.name = name;
    student.gender = gender;
    student.address = address;
    student.mobile = mobile;
    student.birthday = birthday;
    student.age = age;
    student.id = id;

    await this.studentRepository.insert(student);
    this.socketGateway.server.emit(
      'addStudent',
      'A new student has been added.',
    );
    return true;
  }

  async deleteStudent(req: { id: number }): Promise<boolean> {
    const student = await this.studentRepository.findOneBy({
      id: req.id,
    });
    if (student !== null) {
      await this.studentRepository.remove(student);
      this.socketGateway.server.emit(
        'deleteStudent',
        'A student has been removed',
      );
      return true;
    } else {
      return false;
    }
  }

  async updateStudent(req: StudentDTO) {
    const id = req.id;
    const name = req.name;
    const gender = req.gender;
    const address = req.address;
    const mobile = req.mobile;
    const birthday = req.birthday;
    const age = calculateAge(new Date(req.birthday));

    const student = await this.studentRepository.findOneBy({
      id: id,
    });
    if (student !== null) {
      student.name = name;
      student.gender = gender;
      student.address = address;
      student.mobile = mobile;
      student.birthday = birthday;
      student.age = age;

      await this.studentRepository.save(student);
      this.socketGateway.server.emit(
        'updateStudent',
        'A student record has been updated',
      );
      return true;
    } else {
      return false;
    }
  }
}

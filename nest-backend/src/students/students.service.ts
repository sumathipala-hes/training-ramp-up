import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto): Promise<InsertResult> {
    return this.studentRepository.insert(createStudentDto as Student);
  }

  findAll(): Promise<Array<Student>> {
    const students = this.studentRepository.find({ order: { id: 'DESC' } });
    if (!students) {
      throw new Error('No Students Found');
    }
    return students;
  }

  update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    return this.studentRepository.update(id, updateStudentDto as Student);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.studentRepository.delete(id);
  }
}

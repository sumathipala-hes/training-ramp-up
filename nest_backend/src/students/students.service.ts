import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentDto: CreateStudentDto,
  ): Promise<InsertResult> {
    try {
      const newStudent: InsertResult =
        await this.studentRepository.insert(createStudentDto);
      return newStudent;
    } catch (err) {
      throw new Error('Failed to create student.');
    }
  }

  async findAllStudents(): Promise<Array<Student>> {
    try {
      const students: Array<Student> = await this.studentRepository.find({
        order: { id: 'DESC' },
      });

      if (students.length === 0) {
        throw new Error('No students found.');
      }

      return students;
    } catch (err) {
      throw new Error('Failed to fetch students.');
    }
  }

  async findOneStudent(search: string): Promise<Student> {
    try {
      const student: Student = await this.studentRepository.findOne({
        where: [
          { name: search },
          { address: search },
          { mobileNumber: search },
        ],
      });

      if (!student) {
        throw new Error('No student found.');
      }

      return student;
    } catch (err) {
      throw new Error('Failed to fetch student.');
    }
  }

  async updateStudent(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    try {
      const updateStudent: UpdateResult = await this.studentRepository.update(
        id,
        updateStudentDto,
      );

      if (updateStudent.affected === 0) {
        throw new Error('Student not found');
      }

      return updateStudent;
    } catch (err) {
      throw new Error('Failed to update student.');
    }
  }

  async removeStudent(id: string): Promise<DeleteResult> {
    try {
      const deleteStudent: DeleteResult =
        await this.studentRepository.delete(id);

      if (deleteStudent.affected === 0) {
        throw new Error('Student not found');
      }

      return deleteStudent;
    } catch (err) {
      throw new Error('Failed to delete student.');
    }
  }
}

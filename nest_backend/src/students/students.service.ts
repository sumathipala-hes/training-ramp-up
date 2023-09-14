import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { StudentResponseData } from './dto/response-data';

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
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllStudents(): Promise<StudentResponseData> {
    try {
      const students: Student[] = await this.studentRepository.find({
        order: { id: 'DESC' },
      });

      if (students.length === 0) {
        throw new HttpException('No students found.', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Student found successfully',
        data: students,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneStudent(search: string): Promise<StudentResponseData> {
    try {
      const student: Student = await this.studentRepository.findOne({
        where: [
          { name: search },
          { address: search },
          { mobileNumber: search },
        ],
      });

      if (!student) {
        throw new HttpException('No student found.', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Student found successfully',
        data: [student],
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
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
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      return updateStudent;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeStudent(id: string): Promise<DeleteResult> {
    try {
      const deleteStudent: DeleteResult =
        await this.studentRepository.delete(id);

      if (deleteStudent.affected === 0) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      return deleteStudent;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}

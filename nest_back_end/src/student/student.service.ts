import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, InsertResult } from 'typeorm';
import { Student } from './entities/student.entity';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async saveStudent(createStudentDto: CreateStudentDto): Promise<InsertResult> {
    try {
      // Insert the student into the database
      const newStudent: InsertResult = await this.studentRepository.insert(
        createStudentDto as Student,
      );
      return newStudent;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async retrieveAllStudents(): Promise<{ data: CreateStudentDto[] }> {
    try {
      // Retrieve all the students from the database
      const students: CreateStudentDto[] = await this.studentRepository.find({
        order: { studentId: 'DESC' },
      });
      if (!students) {
        throw new HttpException('No student found.', HttpStatus.NOT_FOUND);
      }
      return { data: students };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateStudent(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    try {
      // Update the student in the database
      const updatedStudent: UpdateResult = await this.studentRepository.update(
        id,
        updateStudentDto as Student,
      );
      if (updatedStudent.affected === 1) {
        // If the student is updated
        updatedStudent.raw = updateStudentDto;
      } else {
        throw new HttpException('No student found.', HttpStatus.NOT_FOUND);
      }
      return updatedStudent;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteStudent(id: number): Promise<DeleteResult> {
    try {
      const deletedStudent: DeleteResult =
        await this.studentRepository.delete(id);
      if (deletedStudent.affected !== 1) {
        throw new HttpException('No student found.', HttpStatus.NOT_FOUND);
      }
      return deletedStudent;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}

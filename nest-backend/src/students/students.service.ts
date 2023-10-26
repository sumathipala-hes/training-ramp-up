import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { sendNotification } from 'src/utils/notification.util';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private readonly socketService: SocketService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<InsertResult> {
    try {
      const savedStudent = await this.studentRepository.insert(
        createStudentDto as Student,
      );
      this.socketService.sendNotification('A new student has been created..!');
      return savedStudent;
    } catch (error) {
      sendNotification('Error', 'Student creation failed..!');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<CreateStudentDto[]> {
    try {
      const students = await this.studentRepository.find({
        order: { id: 'DESC' },
      });
      if (!students) {
        throw new Error('No Students Found');
      }
      return students;
    } catch (error) {
      this.socketService.sendNotification('Student fetching failed..!');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    try {
      const updatedStudent = await this.studentRepository.update(
        id,
        updateStudentDto as Student,
      );
      this.socketService.sendNotification('A student has been updated..!');
      return updatedStudent;
    } catch (error) {
      this.socketService.sendNotification('Student updation failed..!');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const removedStudent = await this.studentRepository.delete(id);
      this.socketService.sendNotification('A student has been deleted..!');
      return removedStudent;
    } catch (error) {
      this.socketService.sendNotification('Student deletion failed..!');
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

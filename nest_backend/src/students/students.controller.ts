import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Response } from 'express';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enum/role.enum';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const student: InsertResult =
        await this.studentsService.createStudent(createStudentDto);
      res.status(HttpStatus.CREATED).json({
        message: 'Student created successfully',
        data: student,
      });
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error creating student',
        error: error.message,
      });
    }
  }

  @Roles(Role.Admin, Role.User)
  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      await this.studentsService.findAllStudents().then((students) => {
        res.status(HttpStatus.OK).json({
          message: 'Students found successfully',
          data: students,
        });
      });
    } catch (error: any) {
      if (error.message === 'Student not found') {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Student not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error finding students',
          error: error.message,
        });
      }
    }
  }

  @Roles(Role.Admin, Role.User)
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      this.studentsService.findOneStudent(id).then((student) => {
        res.status(HttpStatus.OK).json({
          message: 'Student found successfully',
          data: student,
        });
      });
    } catch (error: any) {
      if (error.message === 'Student not found') {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Student not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error finding student',
          error: error.message,
        });
      }
    }
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const student: UpdateResult = await this.studentsService.updateStudent(
        id,
        updateStudentDto,
      );
      res.status(HttpStatus.OK).json({
        message: 'Student updated successfully',
        data: student,
      });
    } catch (error: any) {
      if (error.message === 'Student not found') {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Student not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error updating student',
          error: error.message,
        });
      }
    }
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const student: DeleteResult =
        await this.studentsService.removeStudent(id);
      res.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        data: student,
      });
    } catch (error: any) {
      if (error.message === 'Student not found') {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Student not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error deleting student',
          error: error.message,
        });
      }
    }
  }
}

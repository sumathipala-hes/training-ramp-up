import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('api/v1/student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<InsertResult> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll(): Promise<CreateStudentDto[]> {
    return this.studentsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.studentsService.remove(+id);
  }
}

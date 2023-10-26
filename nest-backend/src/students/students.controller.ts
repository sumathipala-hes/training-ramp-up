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
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enum/role.enum';

@Controller('api/v1/student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Roles(Role.ADMIN)
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

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.studentsService.remove(+id);
  }
}

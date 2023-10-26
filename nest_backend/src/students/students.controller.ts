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
// import { Roles } from '../auth/roles.decorator';
// import { Role } from '../enum/role.enum';
import { StudentResponseData } from './dto/response-data';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // @Roles(Role.Admin)
  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<InsertResult> {
    return await this.studentsService.createStudent(createStudentDto);
  }

  // @Roles(Role.Admin, Role.User)
  @Get()
  async findAll(): Promise<StudentResponseData> {
    return await this.studentsService.findAllStudents();
  }

  // @Roles(Role.Admin, Role.User)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StudentResponseData> {
    return await this.studentsService.findOneStudent(id);
  }

  // @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    return await this.studentsService.updateStudent(id, updateStudentDto);
  }

  // @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.studentsService.removeStudent(id);
  }
}

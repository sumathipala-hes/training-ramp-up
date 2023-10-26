import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('api/v1/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.saveStudent(createStudentDto);
  }

  @Get()
  async retrieveAll(): Promise<{ data: CreateStudentDto[] }> {
    return (await this.studentService.retrieveAllStudents()) as {
      data: CreateStudentDto[];
    };
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(+id, updateStudentDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return this.studentService.deleteStudent(+id);
  }
}

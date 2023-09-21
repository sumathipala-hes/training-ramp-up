import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { StudentsService } from './students.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
  async createStudent(@Body() body: CreateStudentDto) {
    this.studentsService.create(
      body.id,
      body.name,
      body.age,
      body.date_of_birth,
      body.gender,
      body.mobile_number,
      body.address,
    );
  }

  @Get('/:id')
  findStudent(@Param('id') id: string) {
    const student = this.studentsService.findOne(parseInt(id));
    if (!student) {
      throw new NotFoundException('student not found');
    }

    return student;
  }

  @Get()
  findAllStudents() {
    return this.studentsService.find();
  }

  @Delete('/:id')
  removeStudent(@Param('id') id: string) {
    return this.studentsService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateStudent(@Param('id') id: string, @Body() body: UpdateStudentDto) {
    return this.studentsService.update(parseInt(id), body);
  }
}

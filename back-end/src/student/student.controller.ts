// student.controller.ts
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { Response } from 'express';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { userRoles } from 'src/utils';

@Controller('students')
@UseGuards(RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/get-students')
  @Roles([userRoles.admin, userRoles.user])
  async getAllStudents(@Body() req: Request, @Res() res: Response) {
    try {
      const students = await this.studentService.fetchStudents();
      return res.status(200).json({
        status: 200,
        data: students,
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          status: 400,
          error: err.message,
        });
      } else {
        return res.status(500).json({
          status: 500,
          error: 'An unknown error occurred.',
        });
      }
    }
  }
  @Post('/add-student')
  @Roles([userRoles.admin])
  async addStudent(@Body() req: Request, @Res() res: Response) {
    try {
      const isSaved = await this.studentService.saveStudent(req);
      if (isSaved) {
        return res.status(200).json({
          status: 200,
        });
      } else {
        throw new Error('Failed to save the student data');
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          status: 400,
          error: err.message,
        });
      } else {
        // Handle the case when 'err' is of unknown type
        return res.status(500).json({
          status: 500,
          error: 'An unknown error occurred.',
        });
      }
    }
  }

  @Post('/remove-student')
  @Roles([userRoles.admin])
  async removeStudent(@Body() req: Request, @Res() res: Response) {
    try {
      const isDeleted = await this.studentService.deleteStudent(req);
      if (isDeleted) {
        return res.status(200).json({
          status: 200,
        });
      } else {
        throw new Error('No Student data found');
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          status: 400,
          error: err.message,
        });
      } else {
        // Handle the case when 'err' is of unknown type
        return res.status(500).json({
          status: 500,
          error: 'An unknown error occurred.',
        });
      }
    }
  }

  @Post('/update-student')
  @Roles([userRoles.admin])
  async updateStudent(@Body() req: Request, @Res() res: Response) {
    try {
      const isUpdated = await this.studentService.updateStudent(req);
      if (isUpdated) {
        return res.status(200).json({
          status: 200,
        });
      } else {
        throw new Error('No Student data found');
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          status: 400,
          error: err.message,
        });
      } else {
        return res.status(500).json({
          status: 500,
          error: 'An unknown error occurred.',
        });
      }
    }
  }
}

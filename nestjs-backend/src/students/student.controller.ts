/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentDto } from "./dto/student.dto";
import { UpdateStudentDto } from "./dto/update.dto";
import { RolesGuard } from "src/auth/role.guard";
import { Role, Roles } from "src/auth/roles";

@UseGuards(RolesGuard)
@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
    @Roles(Role.Admin, Role.User)
    async getStudents(
        @Res() res) {
            try {
                const allStudents = await this.studentService.getStudents();
                return res.status(HttpStatus.OK).json(allStudents);
            } catch (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });

            }
        }

    @Post()
    @Roles(Role.Admin)
    async createStudent(
        @Body() studentDto: StudentDto,
        @Res() res) {
            try {
                const createdStudent = await this.studentService.createStudent(studentDto);
                return res.status(HttpStatus.CREATED).json(createdStudent);
            } catch (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            }
            
        }

    @Put(':id')
    @Roles(Role.Admin)
    async updateStudent(
        @Param('id') id: string,
        @Body() updateStudentDto: UpdateStudentDto,
        @Res() res) {
            try {
                await this.studentService.updateStudent(id, updateStudentDto);
                return res.status(HttpStatus.OK).json({ message: 'Updated the student record' });
            } catch (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            }
        }

    @Delete(':id')
    @Roles(Role.Admin)
    async deleteStudent(
        @Param('id') id: string,
        @Res() res) {
            try{
                await this.studentService.deleteStudent(id);
                return res.status(HttpStatus.OK).json({ message: 'Deleted the student record' });;
            } catch (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            }
        }
}
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { StudentService } from "./student.service";
import { Student } from "./student.model";

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
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
    async createStudent(
        @Body() studentData: Partial<Student>,
        @Res() res) {
            try {
                const createdStudent = await this.studentService.createStudent(studentData);
            return res.status(HttpStatus.CREATED).json(createdStudent);
            } catch (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            }
            
        }

    @Put(':id')
    async updateStudent(
        @Param('id') id: string,
        @Body() studentData: Partial<Student>,
        @Res() res) {
            try {
                await this.studentService.updateStudent(id, studentData);
                return res.sendStatus(HttpStatus.NO_CONTENT);
            } catch (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            }
        }

    @Delete(':id')
    async deleteStudent(
        @Param('id') id: string,
        @Res() res) {
            try{
                await this.studentService.deleteStudent(id);
                return res.sendStatus(HttpStatus.NO_CONTENT);
            } catch (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            }
        }
}
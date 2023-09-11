/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./student.model";
import { StudentDto } from "./student.dto";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}

    async getStudents(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    async createStudent(studentDtO: StudentDto): Promise<Student> {
        const newStudent = this.studentRepository.create(studentDtO);
        await this.studentRepository.save(newStudent);
        return newStudent;
    }

    async updateStudent(id: string, studentDtO: StudentDto): Promise<void> {
        const student = await this.studentRepository.findOneBy({ id: parseInt(id) });
        if(!student) {
            throw new NotFoundException('Student does not exist');
        }
        await this.studentRepository.update(id, studentDtO);
    }

    async deleteStudent(id: string): Promise<void> {
        const result = await this.studentRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Student not found');
        }
    }


}

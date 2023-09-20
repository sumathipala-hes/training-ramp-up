/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./entities/student.entity";
import { StudentDto } from "./dto/student.dto";
import { UpdateStudentDto } from "./dto/update.dto";
import { SocketGateway } from "../socket/socket.gateway";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        private readonly socketGateway: SocketGateway,
    ) {}

    async getStudents(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    async createStudent(studentDtO: StudentDto): Promise<Student> {
        const newStudent = this.studentRepository.create(studentDtO);
        await this.studentRepository.save(newStudent);
        this.socketGateway.server.emit('studentAdded', 'Added a new student');
        return newStudent;
    }

    async updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<void> {
        const student = await this.studentRepository.findOneBy({ id: parseInt(id) });
        if(!student) {
            throw new NotFoundException('Student does not exist');
        }
        await this.studentRepository.update(id, updateStudentDto);
        this.socketGateway.server.emit('studentUpdated', 'Updated a student');
    }

    async deleteStudent(id: string): Promise<void> {
        const result = await this.studentRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Student not found');
        }
        this.socketGateway.server.emit('studentDeleted', 'Deleted a student');
    }
}

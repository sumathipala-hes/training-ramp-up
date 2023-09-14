/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { UpdateStudentDto } from './dto/update.dto';
import { Response } from "express";
import { getRepositoryToken } from '@nestjs/typeorm';

const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
} as unknown as Response;

describe('StudentController', () => {
  let studentController: StudentController;
  let studentService: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        {
            provide: getRepositoryToken(Student),
            useValue: mockResponse,
        },
      ],
    }).compile();

    studentController = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(studentController).toBeDefined();
    });

    describe('getStudents', () => {
        it('should return an array of students', async () => {
            const mockStudents: Student[] = [
                {
                    id: 1,
                    name: 'Lily',
                    gender: 'Female',
                    address: 'New York',
                    mobile: '9876543210',
                    dob: '1998-04-04',
                    age: 25,
                },
                {
                    id: 2,
                    name: 'James',
                    gender: 'Male',
                    address: 'New York',
                    mobile: '9876543210',
                    dob: '1996-04-04',
                    age: 27,
                },
            ];

            jest.spyOn(studentService, 'getStudents').mockResolvedValue(mockStudents);
            await studentController.getStudents(mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith(mockStudents);
        });
        it('should handle errors when getting all students', async () => {
            jest.spyOn(studentService, 'getStudents').mockRejectedValue(new NotFoundException('Error'));
            await studentController.getStudents(mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error' });
        });
    });

    describe('createStudent', () => {
        const studentDtO: StudentDto = {
            name: 'Lily',
            gender: 'Female',
            address: 'New York',
            mobile: '9876543210',
            dob: '1998-04-04',
            age: 25,
        };
        it('should create a student and return it', async () => {

            const createdStudent = { id:1, ...studentDtO };
            jest.spyOn(studentService, 'createStudent').mockResolvedValue(createdStudent);

            await studentController.createStudent(studentDtO, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(mockResponse.json).toHaveBeenCalledWith(createdStudent);
        });
        it('should handle errors when creating a student', async () => {
            jest.spyOn(studentService, 'createStudent').mockRejectedValue(new Error('Validation error'));
            await studentController.createStudent(studentDtO, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Validation error' });
        });
    });

    describe('updateStudent', () => {
        it('should update an existing student and return a success message', async () => {
            const id = '1';
            const updateStudentDto: UpdateStudentDto = {
                name: 'James',
                age: 20,
            };
            jest.spyOn(studentService, 'updateStudent').mockResolvedValue(undefined);
            await studentController.updateStudent(id, updateStudentDto, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Updated the student record' });
        });
        it('should handle errors when updating a student', async () => {
            const id = '1';
            const updateStudentDto: UpdateStudentDto = {
                name: 'James',
                age: 20,
            };
            jest.spyOn(studentService, 'updateStudent').mockRejectedValue(new NotFoundException('Student not found'));

            await studentController.updateStudent(id, updateStudentDto, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Student not found' });
        });      
    });

    describe('deleteStudent', () => {
        it('should delete an existing student and return a success message', async () => {
            const id = '1';
            jest.spyOn(studentService, 'deleteStudent').mockResolvedValue(undefined);

            await studentController.deleteStudent(id, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Deleted the student record' });
        });
        it('should handle errors when deleting a student', async () => {
            const id = '1';
            jest.spyOn(studentService, 'deleteStudent').mockRejectedValue(new NotFoundException('Student not found'));

            await studentController.deleteStudent(id, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Student not found' });
        });
    });

});

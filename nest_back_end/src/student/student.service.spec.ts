// import { Test, TestingModule } from '@nestjs/testing';
// import { StudentService } from './student.service';

// describe('StudentService', () => {
//   let service: StudentService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [StudentService],
//     }).compile();

//     service = module.get<StudentService>(StudentService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('StudentService', () => {
  let service: StudentService;
  let repository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            saveStudent: jest.fn(),
            retrieveAllStudents: jest.fn(),
            updateStudent: jest.fn(),
            deleteStudent: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    repository = module.get<Repository<Student>>(getRepositoryToken(Student));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createStudent', () => {
    const createStudentDto: CreateStudentDto = {
      studentId: 1,
      studentName: 'Pahasara',
      studentAddress: 'Panadura',
      studentMobile: '0717133074',
      studentDob: new Date('2001-01-01'),
      studentGender: 'Male',
    };

    const insertResult: InsertResult = {
      raw: {},
      generatedMaps: [],
      identifiers: [],
    };

    it('should create a new student', async () => {
      repository.insert = jest.fn().mockResolvedValue(insertResult);
      const result = await service.saveStudent(createStudentDto);
      expect(result).toEqual(insertResult);
      expect(repository.insert).toHaveBeenCalledWith(createStudentDto);
    });

    it('should throw an error on failure', async () => {
      repository.insert = jest
        .fn()
        .mockRejectedValue(new Error('Failed to create student.'));

      await expect(service.saveStudent(createStudentDto)).rejects.toThrowError(
        'Failed to create student.',
      );
    });

    it('should throw an error if student already exists', async () => {
      repository.insert = jest
        .fn()
        .mockRejectedValue(new Error('Student already exists.'));

      await expect(service.saveStudent(createStudentDto)).rejects.toThrowError(
        'Student already exists.',
      );
    });
  });

  describe('retrieveAllStudents', () => {
    it('should return an array of students', async () => {
      const students: Student[] = [
        {
          studentId: 2,
          studentName: 'Pasan',
          studentAddress: 'Panadura',
          studentMobile: '0717133074',
          studentDob: new Date('2001-01-01'),
          studentGender: 'Male',
        },
        {
          studentId: 1,
          studentName: 'Pahasara',
          studentAddress: 'Galle',
          studentMobile: '0717133074',
          studentDob: new Date('2001-01-04'),
          studentGender: 'Male',
        },
      ];
      repository.find = jest.fn().mockResolvedValue(students);
      const result = await service.retrieveAllStudents();
      expect(result).toEqual({ data: students });
    });

    it('should handle an empty student list', async () => {
      // Mock the repository's find method to return an empty array
      repository.find = jest.fn().mockResolvedValue([]);
      const result = await service.retrieveAllStudents();
      // Expect the result to be an empty array
      expect(result).toEqual({ data: [] });
    });

    it('should handle an error when retrieving students', async () => {
      repository.find = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Bad Request',
            HttpStatus.BAD_REQUEST,
          ),
        );
      await expect(service.retrieveAllStudents()).rejects.toThrowError(
        'Bad Request',
      );
    });
  });

  describe('updateStudent', () => {
    const updateId = '1';
    const updateStudentDto: CreateStudentDto = {
      studentId: 1,
      studentName: 'Pahasara',
      studentAddress: 'Panadura',
      studentMobile: '0717133074',
      studentDob: new Date('2001-01-01'),
      studentGender: 'Male',
    };

    const updateResult: UpdateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    it('should update a student', async () => {
      repository.update = jest.fn().mockResolvedValue(updateResult);
      const result = await service.updateStudent(
        Number(updateId),
        updateStudentDto,
      );
      expect(result).toEqual(updateResult);
    });

    it('should throw an error on failure', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValue(new Error('Failed to update student.'));

      await expect(
        service.updateStudent(Number(updateId), updateStudentDto),
      ).rejects.toThrowError('Failed to update student.');
    });

    it('should throw an error if student is not found', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValue(new Error('Student not found.'));

      await expect(
        service.updateStudent(Number(updateId), updateStudentDto),
      ).rejects.toThrowError('Student not found.');
    });
  });

  describe('deleteStudent', () => {
    const userId: string = '1';
    const removeResult: DeleteResult = {
      raw: [],
      affected: 1,
    };

    it('should remove a student', async () => {
      repository.delete = jest.fn().mockResolvedValue(removeResult);
      const result = await service.deleteStudent(Number(userId));
      expect(result).toEqual(removeResult);
    });

    it('should throw an error on failure', async () => {
      repository.delete = jest
        .fn()
        .mockRejectedValue(new Error('Failed to delete student.'));

      await expect(service.deleteStudent(Number(userId))).rejects.toThrowError(
        'Failed to delete student.',
      );
    });

    it('should throw an error if student is not found', async () => {
      repository.delete = jest
        .fn()
        .mockRejectedValue(new Error('Student not found.'));

      await expect(service.deleteStudent(Number(userId))).rejects.toThrowError(
        'Student not found.',
      );
    });
  });
});

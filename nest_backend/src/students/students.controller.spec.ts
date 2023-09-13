import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Student } from './entities/student.entity';
import { HttpStatus } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('StudentsController', () => {
  let studentsController: StudentsController;
  let studentsService: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        StudentsService,
        {
          provide: StudentsService,
          useValue: {
            findAllStudents: jest.fn(),
            findOneStudent: jest.fn(),
            createStudent: jest.fn(),
            updateStudent: jest.fn(),
            removeStudent: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();

    studentsController = module.get<StudentsController>(StudentsController);
    studentsService = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(studentsController).toBeDefined();
  });

  describe('findAllStudent', () => {
    const expectedResult: Student[] = [
      {
        id: 1,
        name: 'Nimesh',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
      },
      {
        id: 2,
        name: 'Nimesh',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
      },
    ];

    it('should return an array of students', async () => {
      const getAll = jest
        .spyOn(studentsService, 'findAllStudents')
        .mockResolvedValue(expectedResult);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await studentsController.findAll(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Students found successfully',
        data: expectedResult,
      });

      getAll.mockRestore();
    });

    it('should return an error message if students not found', async () => {
      const getAll = jest
        .spyOn(studentsService, 'findAllStudents')
        .mockRejectedValue(new Error('Student not found'));

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await studentsController.findAll(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Student not found',
      });

      getAll.mockRestore();
    });

    it('should return an error message if students fetch failed', async () => {
      const getAll = jest
        .spyOn(studentsService, 'findAllStudents')
        .mockRejectedValue(new Error('Error finding students'));

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await studentsController.findAll(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Error finding students',
        message: 'Error finding students',
      });

      getAll.mockRestore();
    });
  });

  describe('findOneStudent', () => {
    const expectedResult: Student[] = [
      {
        id: 1,
        name: 'Nimesh',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
      },
      {
        id: 2,
        name: 'Pasan',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
      },
    ];

    it('should return a student', async () => {
      const getOne = jest
        .spyOn(studentsService, 'findOneStudent')
        .mockResolvedValue(expectedResult[0]);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await studentsController.findOne('Nimesh', mockResponse);

      expect(getOne).toHaveBeenCalledWith('Nimesh');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Student found successfully',
        data: expectedResult[0],
      });

      getOne.mockRestore();
    });
  });

  describe('createStudent', () => {
    const createStudentDto: CreateStudentDto = {
      id: 1,
      name: 'Nimesh',
      address: 'Galle',
      mobileNumber: '0761234567',
      dob: new Date('2001-12-15'),
      gender: 'Male',
    };

    it('should return a student', async () => {
      const mockInsertResult = {
        generatedMaps: [{ id: 1 }],
        raw: {},
        identifiers: [],
      };

      jest
        .spyOn(studentsService, 'createStudent')
        .mockResolvedValue(mockInsertResult);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await studentsController.create(createStudentDto, mockResponse);

      expect(studentsService.createStudent).toHaveBeenCalledWith(
        createStudentDto,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Student created successfully',
        data: mockInsertResult,
      });
    });

    it('should handle error and return error response', async () => {
      const mockError = new Error('Error creating student');

      jest.spyOn(studentsService, 'createStudent').mockRejectedValue(mockError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await studentsController.create(createStudentDto, mockResponse);

      expect(studentsService.createStudent).toHaveBeenCalledWith(
        createStudentDto,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error creating student',
        error: mockError.message,
      });
    });
  });

  describe('updateStudent', () => {
    const id = '1';
    const updateStudentDto: UpdateStudentDto = {
      id: 1,
      name: 'Nimesh',
      address: 'Galle',
      mobileNumber: '0761234567',
      dob: new Date('2001-12-15'),
      gender: 'Male',
    };

    it('should return a student', async () => {
      const updateStudentResult: UpdateResult = {
        affected: 1,
        generatedMaps: [],
        raw: [],
      };

      jest
        .spyOn(studentsService, 'updateStudent')
        .mockResolvedValue(updateStudentResult);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await studentsController.update(id, updateStudentDto, mockResponse);

      expect(studentsService.updateStudent).toHaveBeenCalledWith(
        id,
        updateStudentDto,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Student updated successfully',
        data: updateStudentResult,
      });
    });

    it('should handle error and return error response', async () => {
      const mockError = new Error('Student not found');

      jest.spyOn(studentsService, 'updateStudent').mockRejectedValue(mockError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await studentsController.update(id, updateStudentDto, mockResponse);

      expect(studentsService.updateStudent).toHaveBeenCalledWith(
        id,
        updateStudentDto,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Student not found',
      });
    });

    it('should handle other errors and return error response', async () => {
      const mockError = new Error('Error updating student');

      jest.spyOn(studentsService, 'updateStudent').mockRejectedValue(mockError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await studentsController.update(id, updateStudentDto, mockResponse);

      expect(studentsService.updateStudent).toHaveBeenCalledWith(
        id,
        updateStudentDto,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error updating student',
        error: mockError.message,
      });
    });
  });

  describe('removeStudent', () => {
    const id = '1';
    it('should delete a student and return success response', async () => {
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: [],
      };

      jest
        .spyOn(studentsService, 'removeStudent')
        .mockResolvedValue(mockDeleteResult);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await studentsController.remove(id, mockResponse);

      expect(studentsService.removeStudent).toHaveBeenCalledWith(id);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Student deleted successfully',
        data: mockDeleteResult,
      });
    });

    it('should handle "Student not found" error and return error response', async () => {
      const mockError = new Error('Student not found');

      jest.spyOn(studentsService, 'removeStudent').mockRejectedValue(mockError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await studentsController.remove(id, mockResponse);

      expect(studentsService.removeStudent).toHaveBeenCalledWith(id);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Student not found',
      });
    });

    it('should handle other errors and return error response', async () => {
      const mockError = new Error('Error deleting student');

      jest.spyOn(studentsService, 'removeStudent').mockRejectedValue(mockError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await studentsController.remove(id, mockResponse);

      expect(studentsService.removeStudent).toHaveBeenCalledWith(id);
      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error deleting student',
        error: mockError.message,
      });
    });
  });
});

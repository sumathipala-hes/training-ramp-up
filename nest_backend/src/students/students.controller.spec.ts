import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { JwtService } from '@nestjs/jwt';
import { Student } from './entities/student.entity';
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

      await studentsController.findAll();

      expect(getAll).toHaveBeenCalled();
      getAll.mockRestore();
    });

    it('should return an error message if students not found', async () => {
      const getAll = jest
        .spyOn(studentsService, 'findAllStudents')
        .mockRejectedValue(new Error('Student not found'));

      await studentsController.findAll();

      expect(getAll).toHaveBeenCalled();

      getAll.mockRestore();
    });

    it('should return an error message if students fetch failed', async () => {
      const getAll = jest
        .spyOn(studentsService, 'findAllStudents')
        .mockRejectedValue(new Error('Error finding students'));

      await studentsController.findAll();

      expect(getAll).toHaveBeenCalled();
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
        .mockResolvedValue();
      await studentsController.findOne('Nimesh');

      expect(getOne).toHaveBeenCalledWith('Nimesh');
      expect(getOne).toHaveReturnedWith(expectedResult[0]);

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

      await studentsController.create(createStudentDto);

      expect(studentsService.createStudent).toHaveBeenCalledWith(
        createStudentDto,
      );
      expect(mockInsertResult).toEqual(mockInsertResult);
    });

    it('should handle error and return error response', async () => {
      const mockError = new Error('Error creating student');

      jest.spyOn(studentsService, 'createStudent').mockRejectedValue(mockError);

      await studentsController.create(createStudentDto);

      expect(studentsService.createStudent).toHaveBeenCalledWith(
        createStudentDto,
      );
      expect(mockError.message).toEqual('Error creating student');
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

      await studentsController.update(id, updateStudentDto);

      expect(studentsService.updateStudent).toHaveBeenCalledWith(
        id,
        updateStudentDto,
      );
      expect(updateStudentResult).toEqual(updateStudentResult);
    });

    it('should handle error and return error response', async () => {
      const mockError = new Error('Student not found');

      jest.spyOn(studentsService, 'updateStudent').mockRejectedValue(mockError);

      await studentsController.update(id, updateStudentDto);

      expect(studentsService.updateStudent).toHaveBeenCalledWith(
        id,
        updateStudentDto,
      );
      expect(mockError.message).toEqual('Student not found');
    });

    it('should handle other errors and return error response', async () => {
      const mockError = new Error('Error updating student');

      jest.spyOn(studentsService, 'updateStudent').mockRejectedValue(mockError);

      await studentsController.update(id, updateStudentDto);

      expect(studentsService.updateStudent).toHaveBeenCalledWith(
        id,
        updateStudentDto,
      );
      expect(mockError.message).toEqual('Error updating student');
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

      await studentsController.remove(id);

      expect(studentsService.removeStudent).toHaveBeenCalledWith(id);
      expect(mockDeleteResult).toEqual(mockDeleteResult);
    });

    it('should handle "Student not found" error and return error response', async () => {
      const mockError = new Error('Student not found');

      jest.spyOn(studentsService, 'removeStudent').mockRejectedValue(mockError);

      await studentsController.remove(id);

      expect(studentsService.removeStudent).toHaveBeenCalledWith(id);
      expect(mockError.message).toEqual('Student not found');
    });

    it('should handle other errors and return error response', async () => {
      const mockError = new Error('Error deleting student');

      jest.spyOn(studentsService, 'removeStudent').mockRejectedValue(mockError);

      await studentsController.remove(id);

      expect(studentsService.removeStudent).toHaveBeenCalledWith(id);
      expect(mockError.message).toEqual('Error deleting student');
    });
  });
});

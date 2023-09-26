import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { JwtService } from '@nestjs/jwt';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { StudentResponseData } from './dto/response-data';

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

    it('should fail in student creation and throw an error', async () => {
      jest
        .spyOn(studentsService, 'createStudent')
        .mockRejectedValue(new Error());

      await expect(
        studentsController.create(createStudentDto),
      ).rejects.toThrowError();
    });

    it('should fail and throw an error if student already exists', async () => {
      jest
        .spyOn(studentsService, 'createStudent')
        .mockRejectedValue(new Error('Student already exists'));

      await expect(studentsController.create(createStudentDto)).rejects.toThrow(
        'Student already exists',
      );
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

    it('should fail in student update and throw an error', async () => {
      jest
        .spyOn(studentsService, 'updateStudent')
        .mockRejectedValue(new Error());

      await expect(
        studentsController.update(id, updateStudentDto),
      ).rejects.toThrowError();
    });

    it('should fail and throw an error if student does not exists', async () => {
      jest
        .spyOn(studentsService, 'updateStudent')
        .mockRejectedValue(new Error('Student does not exists'));

      await expect(
        studentsController.update(id, updateStudentDto),
      ).rejects.toThrowError('Student does not exists');
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

    it('should fail in student deletion and throw an error', async () => {
      jest
        .spyOn(studentsService, 'removeStudent')
        .mockRejectedValue(new Error());

      await expect(studentsController.remove(id)).rejects.toThrowError();
    });

    it('should fail and throw an error if student does not exists', async () => {
      jest
        .spyOn(studentsService, 'removeStudent')
        .mockRejectedValue(new Error('Student does not exists'));

      await expect(studentsController.remove(id)).rejects.toThrowError(
        'Student does not exists',
      );
    });
  });

  describe('findAllStudents', () => {
    it('should return an array of students', async () => {
      const result: StudentResponseData = {
        message: 'Student found successfully',
        data: [
          {
            id: 1,
            name: 'Nimesh',
            address: 'Galle',
            mobileNumber: '0761234567',
            dob: new Date('2001 - 12 - 15'),
            gender: 'Male',
          },
        ],
      };

      jest.spyOn(studentsService, 'findAllStudents').mockResolvedValue(result);

      expect(await studentsController.findAll()).toBe(result);
    });

    it('should fail in students retrieval and throw an error', async () => {
      jest
        .spyOn(studentsService, 'findAllStudents')
        .mockRejectedValue(new Error());
      await expect(studentsController.findAll()).rejects.toThrowError();
    });

    it('should return an empty array if no students found', async () => {
      const result: StudentResponseData = {
        message: 'Student not found',
        data: [],
      };

      jest.spyOn(studentsService, 'findAllStudents').mockResolvedValue(result);

      expect(await studentsController.findAll()).toBe(result);
    });
  });

  describe('findOneStudent', () => {
    const search = 'Nimesh';
    it('should return a student', async () => {
      const result: StudentResponseData = {
        message: 'Student found successfully',
        data: [
          {
            id: 1,
            name: 'Nimesh',
            address: 'Galle',
            mobileNumber: '0761234567',
            dob: new Date('2001 - 12 - 15'),
            gender: 'Male',
          },
        ],
      };

      jest.spyOn(studentsService, 'findOneStudent').mockResolvedValue(result);

      expect(await studentsController.findOne(search)).toBe(result);
    });

    it('should fail in student retrieval and throw an error', async () => {
      jest
        .spyOn(studentsService, 'findOneStudent')
        .mockRejectedValue(new Error());
      await expect(studentsController.findOne(search)).rejects.toThrowError();
    });

    it('should return an empty array if no students found', async () => {
      const result: StudentResponseData = {
        message: 'Student not found',
        data: [],
      };

      jest.spyOn(studentsService, 'findOneStudent').mockResolvedValue(result);

      expect(await studentsController.findOne(search)).toBe(result);
    });
  });
});

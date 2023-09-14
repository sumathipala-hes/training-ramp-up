import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { JwtService } from '@nestjs/jwt';
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
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult, InsertResult } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

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

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    const insertResult: InsertResult = {
      raw: {},
      generatedMaps: [],
      identifiers: [],
    };

    it('should create a new student', async () => {
      studentRepository.insert = jest.fn().mockResolvedValue(insertResult);
      const result = await service.createStudent(createStudentDto);
      expect(result).toEqual(insertResult);
      expect(studentRepository.insert).toHaveBeenCalledWith(createStudentDto);
    });

    it('should throw an error on failure', async () => {
      studentRepository.insert = jest
        .fn()
        .mockRejectedValue(new Error('Failed to create student.'));

      await expect(
        service.createStudent(createStudentDto),
      ).rejects.toThrowError('Failed to create student.');
    });
  });

  describe('findAllStudent', () => {
    it('should return an array of students', async () => {
      studentRepository.find = jest.fn().mockResolvedValue(expectedResult);
      const result = await service.findAllStudents();
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error on failure', async () => {
      studentRepository.find = jest
        .fn()
        .mockRejectedValue(new Error('Failed to fetch students.'));

      await expect(service.findAllStudents()).rejects.toThrowError(
        'Failed to fetch students.',
      );
    });
  });

  describe('findOneStudent', () => {
    const searchId = 'Nimesh';

    it('should return a student by id', async () => {
      studentRepository.findOne = jest
        .fn()
        .mockResolvedValue(expectedResult[0]);

      const result = await service.findOneStudent(searchId);
      expect(result).toEqual(expectedResult[0]);
    });

    it('should throw an error on failure', async () => {
      studentRepository.findOne = jest
        .fn()
        .mockRejectedValue(new Error('Failed to fetch student.'));

      await expect(service.findOneStudent(searchId)).rejects.toThrowError(
        'Failed to fetch student.',
      );
    });
  });

  describe('updateStudent', () => {
    const updateId = '1';
    const updateStudentDto: CreateStudentDto = {
      id: 1,
      name: 'Sandun',
      address: 'Galle',
      mobileNumber: '0761234567',
      dob: new Date('2001-12-15'),
      gender: 'Male',
    };

    const updateResult: UpdateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    it('should update a student', async () => {
      studentRepository.update = jest.fn().mockResolvedValue(updateResult);
      const result = await service.updateStudent(updateId, updateStudentDto);
      expect(result).toEqual(updateResult);
    });

    it('should throw an error on failure', async () => {
      studentRepository.update = jest.fn().mockRejectedValue(null);
      try {
        await service.updateStudent('1', updateStudentDto);
        fail('Expected an error to be thrown');
      } catch (err) {
        expect(err.message).toBe('Failed to update student.');
      }
    });
  });

  describe('removeStudent', () => {
    const removeId: string = '1';
    const removeResult: DeleteResult = {
      raw: [],
      affected: 1,
    };

    it('should remove a student', async () => {
      studentRepository.delete = jest.fn().mockResolvedValue(removeResult);
      const result = await service.removeStudent(removeId);
      expect(result).toEqual(removeResult);
    });

    it('should throw an error on failure', async () => {
      studentRepository.delete = jest.fn().mockRejectedValue(null);
      try {
        await service.removeStudent(removeId);
        fail('Expected an error to be thrown');
      } catch (err) {
        expect(err.message).toBe('Failed to delete student.');
      }
    });
  });
});

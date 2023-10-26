import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult, InsertResult } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { SocketService } from '../socket/socket.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        SocketService,
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

    it('should throw an error if student already exists', async () => {
      studentRepository.insert = jest
        .fn()
        .mockRejectedValue(new Error('Student already exists.'));

      await expect(
        service.createStudent(createStudentDto),
      ).rejects.toThrowError('Student already exists.');
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
      studentRepository.update = jest
        .fn()
        .mockRejectedValue(new Error('Failed to update student.'));

      await expect(
        service.updateStudent(updateId, updateStudentDto),
      ).rejects.toThrowError('Failed to update student.');
    });

    it('should throw an error if student is not found', async () => {
      studentRepository.update = jest
        .fn()
        .mockRejectedValue(new Error('Student not found.'));

      await expect(
        service.updateStudent(updateId, updateStudentDto),
      ).rejects.toThrowError('Student not found.');
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
      studentRepository.delete = jest
        .fn()
        .mockRejectedValue(new Error('Failed to delete student.'));

      await expect(service.removeStudent(removeId)).rejects.toThrowError(
        'Failed to delete student.',
      );
    });

    it('should throw an error if student is not found', async () => {
      studentRepository.delete = jest
        .fn()
        .mockRejectedValue(new Error('Student not found.'));

      await expect(service.removeStudent(removeId)).rejects.toThrowError(
        'Student not found.',
      );
    });
  });

  describe('findAllStudent', () => {
    it('should return an array of students', async () => {
      const student: Student[] = [
        {
          id: 1,
          name: 'Nimesh',
          address: 'Galle',
          mobileNumber: '0761234567',
          dob: new Date('2001 - 12 - 15'),
          gender: 'Male',
        },
      ];

      jest.spyOn(studentRepository, 'find').mockResolvedValue(student);
    });

    it('should throw an error on failure', async () => {
      studentRepository.find = jest
        .fn()
        .mockRejectedValue(new Error('Failed to find students.'));

      await expect(service.findAllStudents()).rejects.toThrowError(
        'Failed to find students.',
      );
    });

    it('should throw an error if no students are found', async () => {
      studentRepository.find = jest
        .fn()
        .mockRejectedValue(new Error('No students found.'));

      await expect(service.findAllStudents()).rejects.toThrowError(
        'No students found.',
      );
    });
  });

  describe('findOneStudent', () => {
    it('should return a student', async () => {
      const student: Student = {
        id: 1,
        name: 'Nimesh',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
      };

      jest.spyOn(studentRepository, 'findOne').mockResolvedValue(student);
    });

    it('should throw an error on failure', async () => {
      studentRepository.findOne = jest
        .fn()
        .mockRejectedValue(new Error('Failed to find student.'));

      await expect(service.findOneStudent('Nimesh')).rejects.toThrowError(
        'Failed to find student.',
      );
    });

    it('should throw an error if no student is found', async () => {
      studentRepository.findOne = jest
        .fn()
        .mockRejectedValue(new Error('No student found.'));

      await expect(service.findOneStudent('Nimesh')).rejects.toThrowError(
        'No student found.',
      );
    });
  });
});

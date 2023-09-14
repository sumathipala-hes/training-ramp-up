import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('StudentsService', () => {
  let service: StudentsService;
  let repo: Repository<Student>;
  const STUDENT_REPOSITORY_TOKEN = getRepositoryToken(Student);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: STUDENT_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repo = module.get<Repository<Student>>(STUDENT_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('create student', () => {
    const result: Student = {
      id: 1,
      name: 'Dasun',
      address: 'Galle',
      mobile: '0746578012',
      dob: new Date('2001-01-01'),
      gender: 'Male',
    };
    const insertResult = {
      identifiers: [result],
      generatedMaps: [result],
      raw: result,
    };
    it('create student success', async () => {
      repo.insert = jest.fn().mockResolvedValue(insertResult);
      const data = await service.create(result);
      expect(data).toEqual(insertResult);
    });
    it('create student fail', async () => {
      repo.insert = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(service.create(result)).rejects.toThrowError(
        'Internal Server Error',
      );
    });
  });

  describe('find all students', () => {
    const result: Student[] = [
      {
        id: 1,
        name: 'Dasun',
        address: 'Galle',
        mobile: '0746578012',
        dob: new Date('2001-01-01'),
        gender: 'Male',
      },
      {
        id: 1,
        name: 'Dasun',
        address: 'Galle',
        mobile: '0746578012',
        dob: new Date('2001-01-01'),
        gender: 'Male',
      },
    ];

    it('find all students success', async () => {
      repo.find = jest.fn().mockResolvedValue(result);
      const data = await service.findAll();
      expect(data).toEqual(result);
    });
    it('find all students fail', async () => {
      repo.find = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(service.findAll()).rejects.toThrowError(
        'Internal Server Error',
      );
    });
  });

  describe('update student', () => {
    const result: Student = {
      id: 1,
      name: 'Dasun',
      address: 'Galle',
      mobile: '0746578012',
      dob: new Date('2001-01-01'),
      gender: 'Male',
    };
    it('update student success', async () => {
      repo.update = jest.fn().mockResolvedValue(result);
      const data = await service.update(1, result);
      expect(data).toEqual(result);
    });
    it('update student fail', async () => {
      repo.update = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(service.update(1, result)).rejects.toThrowError(
        'Internal Server Error',
      );
    });
  });

  describe('delete student', () => {
    const result = {
      raw: '',
      affected: 1,
    };
    it('delete student success', async () => {
      repo.delete = jest.fn().mockResolvedValue(result);
      const data = await service.remove(1);
      expect(data).toEqual(result);
    });
    it('delete student fail', async () => {
      repo.delete = jest
        .fn()
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(service.remove(1)).rejects.toThrowError(
        'Internal Server Error',
      );
    });
  });
});

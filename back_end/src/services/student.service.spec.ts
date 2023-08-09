import { Student } from '../models/student.models';
import { appDataSource } from '../configs/datasource.config';
import { createStudent, getAllStudents } from './student.service';
import { InsertResult } from 'typeorm';

jest.mock('../configs/datasource.config');

describe('Student Controller Checked', () => {
  const mockRepository = {
    find: jest.fn().mockResolvedValue([
      {
        id: 2,
        name: 'Nimesh',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
      },
      {
        id: 1,
        name: 'Akila',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
      },
    ]),
  };

  const mockManager = {
    getRepository: jest.fn().mockReturnValue(mockRepository),
  };

  describe('Student list object check', () => {
    test('Should fetch and return a list of students', async () => {
      const result = await mockManager
        .getRepository(Student)
        .find({ order: { id: 'DESC' } });
      expect(result).toEqual([
        {
          id: 2,
          name: 'Nimesh',
          address: 'Galle',
          mobileNumber: '0761234567',
          dob: new Date('2001-12-15'),
          gender: 'Male',
        },
        {
          id: 1,
          name: 'Akila',
          address: 'Galle',
          mobileNumber: '0761234567',
          dob: new Date('2001-12-15'),
          gender: 'Male',
        },
      ]);

      expect(mockManager.getRepository).toHaveBeenCalledTimes(1);
      expect(mockManager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { id: 'DESC' },
      });
    });

    test('should throw an error if fetching students fails', async () => {
      const mockRepository = {
        find: jest.fn().mockRejectedValue(new Error('Error')),
      };

      const mockManager = {
        getRepository: jest.fn().mockReturnValue(mockRepository),
      };

      await expect(
        mockManager.getRepository(Student).find({ order: { id: 'DESC' } }),
      ).rejects.toThrowError('Error');

      expect(mockManager.getRepository).toHaveBeenCalledTimes(1);
      expect(mockManager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { id: 'DESC' },
      });
    });
  });

  describe('Get All Students Check', () => {
    test('should fetch and return a list of students', async () => {
      const mockStudentData: Student[] = [
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
          name: 'Akila',
          address: 'Galle',
          mobileNumber: '0761234567',
          dob: new Date('2001-12-15'),
          gender: 'Male',
        },
      ];

      const mockFind = jest.fn().mockResolvedValue(mockStudentData);
      appDataSource.manager.getRepository = jest.fn().mockReturnValue({
        find: mockFind,
      });

      const result = await getAllStudents();

      expect(result).toEqual(mockStudentData);
      expect(appDataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockFind).toHaveBeenCalledWith({ order: { id: 'DESC' } });
    });

    it('should throw an error if fetching students fails', async () => {
      const mockError = new Error('Mocked error');
      const mockFind = jest.fn().mockRejectedValue(mockError);
      appDataSource.manager.getRepository = jest.fn().mockReturnValue({
        find: mockFind,
      });

      await expect(getAllStudents()).rejects.toThrow(mockError);
      expect(appDataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockFind).toHaveBeenCalledWith({ order: { id: 'DESC' } });
    });
  });

  jest.mock('typeorm', () => ({
    InsertResult: class {
      identifiers = [{ id: 1 }]; // Adjust this based on your insert response
    },
    getRepository: jest.fn(),
  }));

  describe('Create Student', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('creates a new student', async () => {
      const studentData: Student = {
        name: 'Akila',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
        id: 0,
      };

      const mockInsert = jest.fn(() => new InsertResult());
      const mockGetRepository = jest.fn(() => ({
        insert: mockInsert,
      }));

      require('../configs/datasource.config').appDataSource.manager = {
        getRepository: mockGetRepository,
      };

      const result: InsertResult = await createStudent(studentData);

      expect(result).toBeInstanceOf(InsertResult);
      expect(result.identifiers).toEqual([{ id: 1 }]);
      expect(mockGetRepository).toHaveBeenCalledWith(Student);
      expect(mockInsert).toHaveBeenCalledWith(studentData);
    });

    it('throws an error if creation fails', async () => {
      const studentData: Student = {
        id: 1,
        name: 'Akila',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
      };

      const errorMessage = 'Insert failed';
      const mockInsert = jest.fn(() => Promise.reject(new Error(errorMessage)));
      const mockGetRepository = jest.fn(() => ({
        insert: mockInsert,
      }));

      require('../configs/datasource.config').appDataSource.manager = {
        getRepository: mockGetRepository,
      };

      try {
        await createStudent(studentData);
      } catch (error) {
        // expect(error.message).toBe(errorMessage);
        expect(mockGetRepository).toHaveBeenCalledWith(Student);
        expect(mockInsert).toHaveBeenCalledWith(studentData);
      }
    });
  });
});

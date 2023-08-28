import { Student } from '../models/student.models';
import { appDataSource } from '../configs/datasource.config';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from './student.service';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { sendNotification } from '../util/notification.util';

jest.mock('../util/notification.util', () => ({
  sendNotification: jest.fn(),
}));

describe('Student Service Checked', () => {
  const mockStudentData = [
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

  const mockGetRepository = jest.fn().mockReturnValue({
    find: mockFind,
    insert: jest.fn(() => new InsertResult()),
    update: jest.fn(() => new UpdateResult()),
    delete: jest.fn(() => new DeleteResult()),
  });

  appDataSource.manager.getRepository = mockGetRepository;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Student list', () => {
    test('should fetch and return a list of students', async () => {
      const result = await getAllStudents();

      expect(result).toEqual(mockStudentData);
      expect(mockGetRepository).toHaveBeenCalledWith(Student);
      expect(mockFind).toHaveBeenCalledWith({ order: { id: 'DESC' } });
    });

    test('should throw an error if fetching students fails', async () => {
      const mockError = new Error('Mocked error');
      mockFind.mockRejectedValue(mockError);

      await expect(getAllStudents()).rejects.toThrow(mockError);
      expect(mockGetRepository).toHaveBeenCalledWith(Student);
      expect(mockFind).toHaveBeenCalledWith({ order: { id: 'DESC' } });
    });
  });

  describe('Create Student', () => {
    test('creates a new student', async () => {
      const studentData = {
        name: 'Akila',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
        id: 1,
      };

      const result = await createStudent(studentData);

      expect(result).toBeInstanceOf(InsertResult);
      expect(mockGetRepository).toHaveBeenCalledWith(Student);
      expect(mockGetRepository().insert).toHaveBeenCalledWith(studentData);
      expect(sendNotification).toHaveBeenCalledWith(
        'New Student',
        'A New Student has been Added to the Database.',
      );
    });

    test('throws an error if creation fails', async () => {
      const studentData = {
        id: 1,
        name: 'Akila',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001-12-15'),
        gender: 'Male',
      };

      const errorMessage = 'Insert failed';
      const mockInsert = jest.fn(() => Promise.reject(new Error(errorMessage)));
      mockGetRepository().insert = mockInsert;

      await expect(createStudent(studentData)).rejects.toThrow(errorMessage);
      expect(mockGetRepository).toHaveBeenCalledWith(Student);
      expect(mockInsert).toHaveBeenCalledWith(studentData);
      expect(sendNotification).not.toHaveBeenCalled();
    });
  });

  describe('Update Student', () => {
    test('update a  student', async () => {
      const updateStudentData = {
        name: 'Pasan',
        address: 'Galle',
        mobileNumber: '0761234563',
        dob: new Date('2001-12-11'),
        gender: 'Male',
        id: 1,
      };

      const result = await updateStudent('1', updateStudentData);

      expect(result).toBeInstanceOf(UpdateResult);
      expect(mockGetRepository).toHaveBeenCalledWith(Student);
      expect(mockGetRepository().update).toHaveBeenCalledWith(
        '1',
        updateStudentData,
      );
      expect(sendNotification).toHaveBeenCalledWith(
        'Student Updated',
        'A Student has been Updated in the Database.',
      );
    });

    test('throws an error if update fails', async () => {
      const updateStudentData = {
        name: 'Pasan',
        address: 'Galle',
        mobileNumber: '0761234563',
        dob: new Date('2001-12-11'),
        gender: 'Male',
        id: 1,
      };

      const errorMessage = 'Update failed';
      const mockUpdate = jest.fn(() => Promise.reject(new Error(errorMessage)));
      mockGetRepository().update = mockUpdate;

      await expect(updateStudent('1', updateStudentData)).rejects.toThrow(
        errorMessage,
      );
      expect(mockGetRepository).toHaveBeenCalledWith(Student);
      expect(mockUpdate).toHaveBeenCalledWith('1', updateStudentData);
      expect(sendNotification).not.toHaveBeenCalled();
    });
  });

  describe('Delete Student', () => {
    test('Delete a  student', async () => {
      const result = await deleteStudent('1');

      expect(result).toBeInstanceOf(DeleteResult);
      expect(mockGetRepository).toHaveBeenCalledWith(Student);
      expect(mockGetRepository().delete).toHaveBeenCalledWith('1');
      expect(sendNotification).toHaveBeenCalledWith(
        'Student Deleted',
        'A Student has been Deleted from the Database.',
      );
    });

    test('throws an error if delete fails', async () => {
      const errorMessage = 'Delete failed';
      const mockDelete = jest.fn(() => Promise.reject(new Error(errorMessage)));
      mockGetRepository().delete = mockDelete;

      await expect(deleteStudent('1')).rejects.toThrow(errorMessage);
      expect(mockGetRepository).toHaveBeenCalledWith(Student);
      expect(mockDelete).toHaveBeenCalledWith('1');
      expect(sendNotification).not.toHaveBeenCalled();
    });
  });
});

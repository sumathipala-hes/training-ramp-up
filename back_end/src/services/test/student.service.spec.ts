import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

import { Student } from '../../models/student.model';
import { sendNotification } from '../../util/notification.util';
import {
  retrieveAllStudents,
  saveStudent,
  updateStudent,
  deleteStudent,
} from '.././student.service';
import { dataSource } from '../../configs/db.config';

jest.mock('../../configs/db.config');

jest.mock('../../util/notification.util', () => ({
  sendNotification: jest.fn(),
}));

describe('Student Service', () => {
  describe('getAllStudents', () => {
    test('should fetch and return a list of students', async () => {
      const mockStudentData: Student[] = [
        // Mock student data for testing
        {
          studentId: 1,
          studentName: 'Pahasara',
          studentAddress: 'Panadura',
          studentMobile: '0717133074',
          studentDob: new Date('2001-08-04'),
          studentGender: 'Male',
        },
      ];

      const mockFind = jest.fn().mockResolvedValue(mockStudentData);
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        find: mockFind,
      });

      const result = await retrieveAllStudents();

      expect(result).toEqual(mockStudentData);
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockFind).toHaveBeenCalledWith({ order: { studentId: 'DESC' } });
    });

    it('should throw an error if fetching students fails', async () => {
      const mockError = new Error('Mocked error');
      const mockFind = jest.fn().mockRejectedValue(mockError);
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        find: mockFind,
      });

      await expect(retrieveAllStudents()).rejects.toThrow(mockError);
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockFind).toHaveBeenCalledWith({ order: { studentId: 'DESC' } });
    });
  });

  describe('createStudent', () => {
    test('should create a new student', async () => {
      const mockStudentData: Student = {
        studentId: 1,
        studentName: 'Pahasara',
        studentAddress: 'Panadura',
        studentMobile: '0717133074',
        studentDob: new Date('2001-08-04'),
        studentGender: 'Male',
      };

      const mockInsert = jest.fn().mockResolvedValue(new InsertResult());
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        insert: mockInsert,
      });

      const result = await saveStudent(mockStudentData);

      expect(result).toEqual(new InsertResult()); // Adjust this based on your mock response
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockInsert).toHaveBeenCalledWith(mockStudentData);
      expect(sendNotification).toHaveBeenCalledWith(
        'Success',
        'student Saved..!',
      );
    });

    it('should throw an error if creating a student fails', async () => {
      const mockError = new Error('Mocked error');
      const mockInsert = jest.fn().mockRejectedValue(mockError);
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        insert: mockInsert,
      });

      const mockStudentData: Student = {
        studentId: 1,
        studentName: 'Pahasara',
        studentAddress: 'Panadura',
        studentMobile: '0717133074',
        studentDob: new Date('2001-08-04'),
        studentGender: 'Male',
      };

      await expect(saveStudent(mockStudentData)).rejects.toThrow(mockError);
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockInsert).toHaveBeenCalledWith(mockStudentData);
    });
  });

  describe('updateStudent', () => {
    let mockUpdate: jest.Mock;

    beforeEach(() => {
      mockUpdate = jest.fn();
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        update: mockUpdate,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should update an existing student', async () => {
      const id = '1';
      const mockStudentData: Student = {
        studentId: 1,
        studentName: 'Pahasara',
        studentAddress: 'Galle',
        studentMobile: '0717133074',
        studentDob: new Date('2001-08-04'),
        studentGender: 'Male',
      };

      const mockUpdateResult = new UpdateResult();
      mockUpdateResult.affected = 1; // Simulate a successful update

      mockUpdate.mockResolvedValue(mockUpdateResult);

      const result = await updateStudent(id, mockStudentData);

      expect(result).toEqual(mockUpdateResult);
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockUpdate).toHaveBeenCalledWith(id, mockStudentData);
      expect(sendNotification).toHaveBeenCalledWith(
        'Success',
        'student Updated..!',
      );
    });

    test('should throw an error if student is not found', async () => {
      const id = '1';
      const mockStudentData: Student = {
        studentId: 1,
        studentName: 'Pahasara',
        studentAddress: 'Galle',
        studentMobile: '0717133074',
        studentDob: new Date('2001-08-04'),
        studentGender: 'Male',
      };

      const mockUpdateResult = new UpdateResult();
      mockUpdateResult.affected = 0; // Simulate student not found

      mockUpdate.mockResolvedValue(mockUpdateResult);

      await expect(updateStudent(id, mockStudentData)).rejects.toThrow(
        'Student not found.',
      );
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockUpdate).toHaveBeenCalledWith(id, mockStudentData);
    });

    test('should throw an error if updating a student fails', async () => {
      const id = '1';
      const mockStudentData: Student = {
        studentId: 1,
        studentName: 'Pahasara',
        studentAddress: 'Galle',
        studentMobile: '0717133074',
        studentDob: new Date('2001-08-04'),
        studentGender: 'Male',
      };

      const mockError = new Error('Mocked error');
      mockUpdate.mockRejectedValue(mockError);

      await expect(updateStudent(id, mockStudentData)).rejects.toThrow(
        mockError,
      );
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockUpdate).toHaveBeenCalledWith(id, mockStudentData);
    });
  });

  describe('deleteStudent', () => {
    let mockDelete: jest.Mock;

    beforeEach(() => {
      mockDelete = jest.fn();
      dataSource.manager.getRepository = jest.fn().mockReturnValue({
        delete: mockDelete,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should delete an existing student', async () => {
      const id = '1';

      const mockDeleteResult = new DeleteResult();
      mockDeleteResult.affected = 1; // Simulate a successful deletion

      mockDelete.mockResolvedValue(mockDeleteResult);

      const result = await deleteStudent(id);

      expect(result).toEqual(mockDeleteResult);
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockDelete).toHaveBeenCalledWith(id);
      expect(sendNotification).toHaveBeenCalledWith('', 'student Deleted..!');
    });

    test('should throw an error if student is not found', async () => {
      const id = '1';

      const mockDeleteResult = new DeleteResult();
      mockDeleteResult.affected = 0; // Simulate student not found

      mockDelete.mockResolvedValue(mockDeleteResult);

      await expect(deleteStudent(id)).rejects.toThrow('Student not found.');
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockDelete).toHaveBeenCalledWith(id);
    });

    test('should throw an error if deleting a student fails', async () => {
      const id = '1';

      const mockError = new Error('Mocked error');
      mockDelete.mockRejectedValue(mockError);

      await expect(deleteStudent(id)).rejects.toThrow(mockError);
      expect(dataSource.manager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockDelete).toHaveBeenCalledWith(id);
    });
  });
});

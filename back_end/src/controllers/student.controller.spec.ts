import { appDataSource } from '../configs/datasource.config';
import { Student } from '../models/student.models';
import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} from '../services/student.service';

describe('Student Controller Checked', () => {
  const studentRepo = appDataSource.manager;

  describe('Get All students', () => {
    const allStudents = [
      {
        id: 1,
        name: 'Nimesh',
        address: 'Galle',
        mobileNumber: '0761234567',
        dob: new Date('2001 - 12 - 15'),
        gender: 'Male',
      },
    ];
    test('Get All students success', async () => {
      studentRepo.getRepository(Student).find = jest
        .fn()
        .mockResolvedValue(allStudents);
      const data = await getAllStudents();
      expect(data).toEqual(allStudents);
    });
    test('Get All students fail', async () => {
      studentRepo.getRepository(Student).find = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(getAllStudents()).rejects.toThrowError('Error');
    });
  });

  describe('Create student', () => {
    const newStudent = {
      id: 1,
      name: 'Nimesh',
      address: 'Galle',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
    };

    test('Create student success', async () => {
      studentRepo.getRepository(Student).insert = jest
        .fn()
        .mockResolvedValue(newStudent);
      const data = await createStudent(newStudent);
      expect(data).toEqual(newStudent);
    });
    test('Create student fail', async () => {
      studentRepo.getRepository(Student).insert = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(createStudent(newStudent)).rejects.toThrowError('Error');
    });
  });

  describe('Update student', () => {
    const student: Student = {
      id: 1,
      name: 'Nimesh',
      address: 'Galle',
      mobileNumber: '0761234567',
      dob: new Date('2001 - 12 - 15'),
      gender: 'Male',
    };

    test('Update student success', async () => {
      studentRepo.getRepository(Student).update = jest
        .fn()
        .mockResolvedValue(student);
      const data = await updateStudent('1', student);
      expect(data).toEqual(student);
    });

    test('Update student fail', async () => {
      studentRepo.getRepository(Student).update = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(updateStudent('1', student)).rejects.toThrowError('Error');
    });
  });

  describe('Delete student', () => {
    const id = '1';
    test('Delete student success', async () => {
      studentRepo.getRepository(Student).delete = jest
        .fn()
        .mockResolvedValue(id);
      const data = await deleteStudent(id);
      expect(data).toEqual(id);
    });

    test('Delete student fail', async () => {
      studentRepo.getRepository(Student).delete = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(deleteStudent(id)).rejects.toThrowError('Error');
    });
  });
});

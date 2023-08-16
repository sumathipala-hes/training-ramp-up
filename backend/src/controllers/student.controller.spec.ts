import { dataSource } from '../configs/datasource.config';
import { Student } from '../models/student.model';
import {
  deleteStudent,
  getAllStudents,
  saveStudent,
  updateStudent,
} from '../services/student.service';

describe('Student Controller Test', () => {
  const studentRepo = dataSource.manager;

  describe('Get All Students', () => {
    const allStudents = [
      {
        id: 2,
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

    test('Get All Students Success', async () => {
      studentRepo.find = jest.fn().mockResolvedValue(allStudents);
      const data = await getAllStudents();
      expect(data).toEqual(allStudents);
    });

    test('Get All Students Fail', async () => {
      studentRepo.find = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(getAllStudents()).rejects.toThrowError('Error');
    });
  });

  describe('Save Student', () => {
    const newStudent = {
      id: 1,
      name: 'Dasun',
      address: 'Galle',
      mobile: '0746578012',
      dob: new Date('2001-01-01'),
      gender: 'Male',
    };

    test('Save Student Success', async () => {
      studentRepo.insert = jest.fn().mockResolvedValue(newStudent);
      const data = await saveStudent(newStudent);
      expect(data).toEqual(newStudent);
    });

    test('Save Student Fail', async () => {
      studentRepo.insert = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(saveStudent(newStudent)).rejects.toThrowError('Error');
    });
  });

  describe('Update Student', () => {
    const student: Student = {
      id: 1,
      name: 'Dasun',
      address: 'Galle',
      mobile: '0746578012',
      dob: new Date('2001 - 01 - 01'),
      gender: 'Male',
    };

    test('Update Student Success', async () => {
      studentRepo.update = jest.fn().mockResolvedValue(student);
      const data = await updateStudent('1', student);
      expect(data).toEqual(student);
    });

    test('Update Student Fail', async () => {
      studentRepo.update = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(updateStudent('1', student)).rejects.toThrowError('Error');
    });
  });

  describe('Delete Student', () => {
    const id = '1';

    test('Delete Student Success', async () => {
      studentRepo.delete = jest.fn().mockResolvedValue(id);
      const data = await deleteStudent(id);
      expect(data).toEqual(id);
    });

    test('Delete Student Fail', async () => {
      studentRepo.delete = jest.fn().mockRejectedValue(new Error('Error'));
      await expect(deleteStudent(id)).rejects.toThrowError('Error');
    });
  });
});

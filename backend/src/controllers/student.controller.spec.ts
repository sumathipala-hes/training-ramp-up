import { dataSource } from "../configs/dataSourceConfig";
import { Student } from "../models/student.model";
import { deleteStudent, getAllStudents, saveStudent, updateStudent } from "../services/student.service";

describe('Student Controller Checked', () => {

  const studentRepo = dataSource.manager;

  describe('Get All students', () => {

    const allStudents = [
      {
        id: '1',
        name: 'Dasun',
        address: 'Galle',
        mobile: '0746578012',
        dob: new Date('2001-01-01'),
        gender: 'Male',
      },
      {
        id: '2',
        name: 'Dasun',
        address: 'Galle',
        mobile: '0746578012',
        dob: new Date('2001-01-01'),
        gender: 'Male',
      },
    ];

    test('Get All students success', async () => {

      studentRepo.find = jest
        .fn()
        .mockResolvedValue(allStudents);

      const data = await getAllStudents();
      expect(data).toEqual(allStudents);
    });

    test('Get All students fail', async () => {

      studentRepo.find = jest
        .fn()
        .mockRejectedValue(new Error('Error'));

      await expect(getAllStudents()).rejects.toThrowError('Error');
    });

  });



  describe('Create student', () => {

    const newStudent = {
      id: 1,
      name: 'Dasun',
      address: 'Galle',
      mobile: '0746578012',
      dob: new Date('2001-01-01'),
      gender: 'Male',
    };

    test('Create student success', async () => {
      studentRepo.insert = jest
        .fn()
        .mockResolvedValue(newStudent);

      const data = await saveStudent(newStudent);
      expect(data).toEqual(newStudent);
    });

    test('Create student fail', async () => {
      studentRepo.insert = jest
        .fn()
        .mockRejectedValue(new Error('Error'));

      await expect(saveStudent(newStudent)).rejects.toThrowError('Error');
    });
  });

  describe('Update student', () => {

    const student: Student = {
      id: 1,
      name: 'Dasun',
      address: 'Galle',
      mobile: '0746578012',
      dob: new Date('2001 - 01 - 01'),
      gender: 'Male',
    };

    test('Update student success', async () => {
      studentRepo.update = jest
        .fn()
        .mockResolvedValue(student);
      const data = await updateStudent('1', student);
      expect(data).toEqual(student);
    });

    test('Update student fail', async () => {
      studentRepo.update = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(updateStudent('1', student)).rejects.toThrowError('Error');
    });
  });



  describe('Delete student', () => {

    const id = '1';

    test('Delete student success', async () => {
      studentRepo.delete = jest
        .fn()
        .mockResolvedValue(id);

      const data = await deleteStudent(id);
      expect(data).toEqual(id);
    });

    test('Delete student fail', async () => {
      studentRepo.delete = jest
        .fn()
        .mockRejectedValue(new Error('Error'));
      await expect(deleteStudent(id)).rejects.toThrowError('Error');
    });
  });

});


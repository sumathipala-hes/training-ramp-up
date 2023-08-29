import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { dataSource } from '../configs/datasource.config';
import { Student } from '../models/student.model';
import { sendNotification } from '../utils/notification.util';

export const getAllStudents = async (): Promise<Array<Student>> => {
  try {
    const students: Array<Student> = await dataSource.manager.find(Student, {
      order: {
        id: 'DESC',
      },
    });
    if (students.length == 0) {
      sendNotification('Warning', 'No Students Found..!');
      throw new Error('No Students Found..!');
    }
    return students;
  } catch (error) {
    throw error;
  }
};

export const saveStudent = async (student: Student): Promise<InsertResult> => {
  try {
    const savedStudent = await dataSource.manager.insert(Student, student);
    sendNotification('Successful', 'New Student Saved..!');
    return savedStudent;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (
  id: string,
  student: Student
): Promise<UpdateResult> => {
  try {
    const updatedStudent = await dataSource.manager.update(
      Student,
      id,
      student
    );
    sendNotification('Successful', 'New Student Updated..!');
    return updatedStudent;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id: string): Promise<DeleteResult> => {
  try {
    const deletedStudent = await dataSource.manager.delete(Student, id);
    sendNotification('Successful', 'New Student Deleted..!');
    return deletedStudent;
  } catch (error) {
    throw error;
  }
};

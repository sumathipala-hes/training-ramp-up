import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { appDataSource } from '../configs/datasource.config';
import { Student } from '../models/student.models';
import { sendNotification } from '../util/notification.util';

export const getAllStudents = async (): Promise<Array<Student>> => {
  try {
    const students: Array<Student> = await appDataSource.manager
      .getRepository(Student)
      .find({ order: { id: 'DESC' } });

    if (students.length === 0) {
      throw new Error('No students found');
    }

    return students;
  } catch (error) {
    throw error;
  }
};

export const createStudent = async (
  studentData: Student,
): Promise<InsertResult> => {
  try {
    const newStudent: InsertResult = await appDataSource.manager
      .getRepository(Student)
      .insert(studentData);
    sendNotification(
      'New Student',
      'A New Student has been Added to the Database.',
    );
    return newStudent;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (
  id: string,
  studentData: Student,
): Promise<UpdateResult | null> => {
  try {
    const updatedStudent: UpdateResult = await appDataSource.manager
      .getRepository(Student)
      .update(id, studentData);

    if (updatedStudent.affected === 0) {
      throw new Error('Student not found');
    }
    sendNotification(
      'Student Updated',
      'A Student has been Updated in the Database.',
    );
    return updatedStudent;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id: string): Promise<DeleteResult> => {
  try {
    const deleteResult: DeleteResult = await appDataSource.manager
      .getRepository(Student)
      .delete(id);

    if (deleteResult.affected === 0) {
      throw new Error('Student not found');
    }
    sendNotification(
      'Student Deleted',
      'A Student has been Deleted from the Database.',
    );
    return deleteResult;
  } catch (error) {
    throw error;
  }
};

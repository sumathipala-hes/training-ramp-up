import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { appDataSource } from '../configs/datasource.config';
import { Student } from '../models/student.models';

export const getAllStudents = async (): Promise<Array<Student>> => {
  try {
    const students: Array<Student> = await appDataSource.manager
      .getRepository(Student)
      .find({ order: { id: 'DESC' } });
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
    return newStudent;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (
  id: string,
  studentData: Student,
): Promise<UpdateResult> => {
  try {
    const updatedStudent: UpdateResult = await appDataSource.manager
      .getRepository(Student)
      .update(id, studentData);
    return updatedStudent;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id: string): Promise<DeleteResult> => {
  try {
    const deleteStudent: DeleteResult = await appDataSource.manager
      .getRepository(Student)
      .delete(id);
    return deleteStudent;
  } catch (error) {
    throw error;
  }
};

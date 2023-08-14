import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { dataSource } from '../configs/dataSourceConfig';
import { Student } from '../models/student.model';

export const getAllStudents = async (): Promise<Array<Student>> => {
  try {
    const students: Array<Student> = await dataSource.manager.find(Student, {
      order: {
        id: 'DESC',
        }});
    return students;
  } catch (error) {
    throw error;
  }
};

export const saveStudent = async (student: Student): Promise<InsertResult> => {
  try {
    const savedStudent = await dataSource.manager.insert(Student, student);
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
    return updatedStudent;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id: string): Promise<DeleteResult> => {
  try {
    const deletedStudent = await dataSource.manager.delete(Student, id);
    return deletedStudent;
  } catch (error) {
    throw error;
  }
};

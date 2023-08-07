import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Student } from '../entities/student.entities';
import { appDataSource } from '../configs/datasource.config';

export const getAllStudents = async (): Promise<Array<Student>> => {
  try {
    const students: Array<Student> = await appDataSource.manager
      .getRepository(Student)
      .find({ order: { id: 'DESC' } });
    console.log('Retrieved all students:', students);
    return students;
  } catch (error) {
    console.error('Error while retrieving all students:', error);
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
    console.log('Created a new student:', newStudent);
    return newStudent;
  } catch (error) {
    console.error('Error while creating a new student:', error);
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
    console.log('Updated student:', updatedStudent);
    return updatedStudent;
  } catch (error) {
    console.error('Error while updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (id: string): Promise<DeleteResult> => {
  try {
    const deleteStudent: DeleteResult = await appDataSource.manager
      .getRepository(Student)
      .delete(id);
    console.log('Deleted student with ID:', id);
    return deleteStudent;
  } catch (error) {
    console.error('Error while deleting student:', error);
    throw error;
  }
};

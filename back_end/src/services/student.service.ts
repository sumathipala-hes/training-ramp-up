import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { Student } from '../models/student.model';
import { dataSource } from '../configs/db.config';

const saveStudent = async (student: Student): Promise<InsertResult> => {
  try {
    // Insert the student into the database
    const newStudent: InsertResult = await dataSource.manager
    .getRepository(Student)
    .insert(student);
  return newStudent;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

export default saveStudent;

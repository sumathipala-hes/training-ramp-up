import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Student } from '../models/student.model';
import { dataSource } from '../configs/db.config';
import { sendNotification } from '../util/notification.util';

const saveStudent = async (student: Student): Promise<InsertResult> => {
  try {
    // Insert the student into the database
    const newStudent: InsertResult = await dataSource.manager
      .getRepository(Student)
      .insert(student);
    sendNotification('Success', 'student Saved..!');
    return newStudent;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

const retrieveAllStudents = async (): Promise<Student[]> => {
  try {
    // Retrieve all the students from the database
    const students: Student[] = await dataSource.manager
      .getRepository(Student)
      .find({ order: { studentId: 'DESC' } });
    return students;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

const updateStudent = async (
  id: string,
  student: Student,
): Promise<UpdateResult> => {
  try {
    // Update the student in the database
    const updatedStudent: UpdateResult = await dataSource.manager
      .getRepository(Student)
      .update(id, student);
    if (updatedStudent.affected === 1) {
      // If the student is updated
      updatedStudent.raw = student;
    } else {
      throw new Error('Student not found.');
    }
    sendNotification('Success', 'student Updated..!');
    return updatedStudent;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

const deleteStudent = async (id: string): Promise<DeleteResult> => {
  try {
    const deletedStudent: DeleteResult = await dataSource.manager
      .getRepository(Student)
      .delete(id);
    if (deletedStudent.affected !== 1) {
      throw new Error('Student not found.');
    }
    sendNotification('', 'student Deleted..!');
    return deletedStudent;
  } catch (error) {
    // Handle and rethrow the error
    throw error;
  }
};

export { saveStudent, retrieveAllStudents, updateStudent, deleteStudent };

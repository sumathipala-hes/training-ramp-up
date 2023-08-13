import axios from 'axios';
import { Student } from '../interfaces/studentInterface';

export const getAllStudentsFromApi = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/students`);
    return response.data as Student[];
  } catch (error) {
    throw error;
  }
};

export const deleteStudentApi = async (studentId: number) => {
  try {
    await axios.delete(`http://localhost:4000/students/${studentId}`);
  } catch (error) {
    throw error;
  }
};

export const updateStudentApi = async (
  studentId: number,
  updatedData: Student,
) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/students/${studentId}`,
      updatedData,
    );
    return response.data as Student;
  } catch (error) {
    throw error;
  }
};

export const createStudentApi = async (studentData: Student) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/students`,
      studentData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

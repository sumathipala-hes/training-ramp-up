import { Student } from '../redux/slice';
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

export const getAllStudentsFromApi = async () => {
  const response = await apiInstance.get('/students',{
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  return response.data as Student[];
};

export const deleteStudentApi = async (studentId: number) => {
  await apiInstance.delete(`/students/${studentId}`, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
};

export const updateStudentApi = async (
  studentId: number,
  updatedData: Student,
) => {
  const response = await apiInstance.put(
    `/students/${studentId}`,
    updatedData,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

  return response.data as Student;
};

export const createStudentApi = async (studentData: Student) => {
  const response = await apiInstance.post(`/students`, studentData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });

  return response.data;
};

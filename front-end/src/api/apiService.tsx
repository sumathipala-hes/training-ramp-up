import { Student } from '../redux/slice';
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

export const getAllStudentsFromApi = async () => {
  const response = await apiInstance.get('/students');
  return response.data as Student[];
};

export const deleteStudentApi = async (studentId: number) => {
  await apiInstance.delete(`/students/${studentId}`);
};

export const updateStudentApi = async (
  studentId: number,
  updatedData: Student,
) => {
  const response = await apiInstance.put(`/students/${studentId}`, updatedData);

  return response.data as Student;
};

export const createStudentApi = async (studentData: Student) => {
  const response = await apiInstance.post(`/students`, studentData);

  return response.data;
};


//User APIs
export const loginApi = async (username: String, password: String) => {
  const response = await apiInstance.post('/login', {
      username,
      password
  });
  return response.data;
};

export const registerApi = async (username: String, password: String) => {
  const response = await apiInstance.post('/register', {
      username,
      password
  });
  return response.data;
};

export const logoutApi = async () => {
  const response = await apiInstance.post('/logout');
  return response.data;
}

import axios from 'axios';
import { Student } from '../interfaces/studentInterface';

export const getAllStudentsFromApi = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/students`);
        return response.data as Student[];
    } catch (error) {
        throw error;
    }
}

export const deleteStudentApi = async (studentId: Number) => {
    try {
        await axios.delete(`http://localhost:3001/students/${studentId}`);
    } catch (error) {
        throw error;
    }
}

export const updateStudentApi = async (studentId: Number, updatedData: Student) => {
    try {
        const response = await axios.put(`http://localhost:3001/${studentId}`,updatedData);
        return response.data as Student;
    } catch (error) {
        throw error;
    }
}

export const createStudentApi = async (studentData: Student) => {
    try {
        const response = await axios.post(`http://localhost:3001/students`, studentData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
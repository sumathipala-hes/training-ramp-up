import { Student } from '../interfaces/studentInterface';
import * as actionTypes from './actionTypes';

export const createStudent = (studentData: Student) => ({
    type: actionTypes.CREATE_STUDENT,
    payload: studentData,
});

export const getAllStudents = () => ({
    type: actionTypes.GET_STUDENTS,
  });

  export const updateStudent = (studentId: number, updatedData:Student) => ({
    type: actionTypes.UPDATE_STUDENT,
    payload: {
      id: studentId,
      data: updatedData,
    },
  });

  export const deleteStudent = (studentId: number) => ({
    type: actionTypes.DELETE_STUDENT,
    payload: studentId,
  });

  // export const removeDeletedStudent = (studentId: number) => ({
  //   type: actionTypes.REMOVE_DELETED_STUDENT,
  //   payload: studentId,
  // });
import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import { deleteStudentApi, getAllStudentsFromApi, updateStudentApi } from '../api/apiService';
import { getAllStudentsSuccess, removeDeletedStudent } from './slice';
import { Student } from '../interfaces/studentInterface';
import { deleteStudent, updateStudent } from './actions';
import { PayloadAction } from '@reduxjs/toolkit';

function* getAllStudentsSaga(): Generator<any, void, Student[]> {
    try {
        const fetchedStudents = yield call(getAllStudentsFromApi);
        //success action
        yield put(getAllStudentsSuccess(fetchedStudents));

    } catch (error) {
      console.error('Error fetching all students', error);
    }
}

function* deleteStudentSaga(action: ReturnType<typeof deleteStudent>) {
    const studentId = action.payload; 
    try {
        yield call(deleteStudentApi, studentId)
        //success action
        yield put(removeDeletedStudent(studentId));
    } catch (error) {
        console.error('Error deleting student in postgresql', error);
        
    }
}

// function* updateStudentSaga(action: PayloadAction<Student>) {
//     const { studentId, studentData } = action.payload;
//     try {
//         const updatedStudent = yield call(updateStudentApi, studentId, studentData);
//         //success action
//         yield put(updateStudentSuccess(updateStudent));
//     } catch (error) {
//         console.error('Error updating student in postgresql', error);
//     }
// }

// function* createStudentSaga(action) {
//     try {
//         const createdStudent = yield call(createStudentApi, action.payload);
//         //success action
//         yield put(createStudentSuccess(createdStudent));
//     } catch (error) {
//         console.error('Error creating new student in postgresql', error);
//     }
// }

export default function* studentSaga() {
    yield takeLatest('GET_STUDENTS', getAllStudentsSaga)
    yield takeEvery('DELETE_STUDENT', deleteStudentSaga)
    //yield takeLatest('UPDATE_STUDENT', updateStudentSaga)
    //yield takeLatest('CREATE_STUDENT', createStudentSaga)
}
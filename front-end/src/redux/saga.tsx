import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import {
  createStudentApi,
  deleteStudentApi,
  getAllStudentsFromApi,
  updateStudentApi,
} from '../api/apiService';
import {
  createStudentSuccess,
  getAllStudentsSuccess,
  removeDeletedStudent,
  updateStudentSuccess,
  getAllStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} from './slice';
import { Student } from './slice';

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
    yield call(deleteStudentApi, studentId);
    //success action
    yield put(removeDeletedStudent(studentId));
  } catch (error) {
    console.error('Error deleting student in postgresql', error);
  }
}

function* updateStudentSaga(
  action: ReturnType<typeof updateStudent>,
): Generator {
  const { id: studentId, data: studentData } = action.payload;
  try {
    const updatedStudent = yield call(updateStudentApi, studentId, studentData);
    //success action
    yield put(updateStudentSuccess(updatedStudent));
  } catch (error) {
    console.error('Error updating student in postgresql', error);
  }
}

function* createStudentSaga(
  action: ReturnType<typeof createStudent>,
): Generator<any, void, Student> {
  const newStudent = action.payload;
  try {
    const createdStudent = yield call(createStudentApi, newStudent);
    //success action
    yield put(createStudentSuccess(createdStudent));
  } catch (error) {
    console.error('Error creating new student in postgresql', error);
  }
}

export default function* studentSaga() {
  yield takeLatest(getAllStudents.type, getAllStudentsSaga);
  yield takeEvery(deleteStudent.type, deleteStudentSaga);
  yield takeLatest(updateStudent.type, updateStudentSaga);
  yield takeLatest(createStudent.type, createStudentSaga);
}

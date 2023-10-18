import { call, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";
import { api } from "../../api/api";
import { PayloadAction } from "@reduxjs/toolkit";

interface IStudentData {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNumber: string;
  dob: string;
}

interface IStudentResponse {
  data: {
    message: string;
    data: IStudentData[];
  };
}

function* fetchStudent() {
  try {
    const response: IStudentResponse = yield call(api.get, "/students");
    yield put(studentActions.setStudentEntries(response.data.data));
  } catch (e) {
    alert("Error fetching student data " + e);
  }
}

function* addAndUpdateStudent(action: PayloadAction<IStudentData>) {
  const data = action.payload;

  const studentData = {
    id: data.id,
    name: data.name,
    address: data.address,
    mobileNumber: data.mobileNumber,
    dob: data.dob,
    gender: data.gender,
  };

  const isUpdate: boolean = data.id !== -1;

  try {
    if (isUpdate) {
      yield call(api.put, `/students/${data.id}`, studentData);
    } else {
      yield call(api.post, "/students", studentData);
    }
  } catch (e) {
    alert("Error adding/updating student data " + e);
  }
}

function* deleteStudent(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    yield call(api.delete, `/students/ ${id}`);
  } catch (e) {
    alert("Error deleting student data " + e);
  }
}

export function* studentSaga() {
  yield takeLatest(studentActions.fetchStudent.type, fetchStudent);
  yield takeLatest(studentActions.updateStudentEntry.type, addAndUpdateStudent);
  yield takeLatest(studentActions.deleteStudentEntry.type, deleteStudent);
}

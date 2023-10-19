import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { studentActions } from "./slice";

interface IStudentData {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
}

interface IResponse {
  data: IStudentData[];
}

function* saveAndUpdateStudent(action: PayloadAction<IStudentData>) {
  const { id, name, address, mobile, dob, gender } = action.payload;

  const student = {
    id: id,
    name: name,
    address: address,
    mobile: mobile,
    dob: dob,
    gender: gender,
  };

  const isUpdate: boolean = id != -1;

  try {
    yield call(isUpdate ? api.put : api.post, `/student/${isUpdate ? id : ""}`, student, {
      headers: { "Content-Type": "application/json" },
    });
    yield put(studentActions.fetchStudent());
  } catch (error) {
    alert(error);
  }
}

function* getAllStudents() {
  try {
    const response: IResponse = yield call(api.get, "/student");
    yield put(studentActions.setStudent(response.data));
  } catch (error) {
    alert(error);
  }
}

function* deleteStudent(action: PayloadAction<number>) {
  const id = action.payload;

  try {
    if (id != -1) {
      yield call(api.delete, `/student/${id}`);
    }
  } catch (error) {
    alert(error);
  }
}

export function* studentSaga() {
  yield takeEvery(studentActions.fetchStudent.type, getAllStudents);
  yield takeEvery(studentActions.updateStudent, saveAndUpdateStudent);
  yield takeEvery(studentActions.removeStudent, deleteStudent);
}

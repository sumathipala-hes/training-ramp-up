import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../../api/api";

interface IStudentData {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
  age: number;
}

function* saveStudent(action: PayloadAction<IStudentData>) {
  const { id, name, address, mobile, dob, gender, age } = action.payload;

  const student = {
    id,
    name,
    address,
    mobile,
    dob,
    gender,
    age,
  };

  try {
    yield call(api.post, "/student", student, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    alert(error);
  }
}

function* getAllStudents() {
  try {
    const response: IStudentData[] = yield call(api.get, "/student");
    yield put({ type: "student", payload: response });
  } catch (error) {
    alert(error);
  }
}

function* updateStudent(action: PayloadAction<IStudentData>) {
  const { id, name, address, mobile, dob, gender, age } = action.payload;

  const student = {
    id,
    name,
    address,
    mobile,
    dob,
    gender,
    age,
  };

  try {
    yield call(api.put, "/student", student, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    alert(error);
  }
}

function* deleteStudent(action: PayloadAction<number>) {
  const id = action.payload;

  try {
    yield call(api.delete, `/student/${id}`);
  } catch (error) {
    alert(error);
  }
}

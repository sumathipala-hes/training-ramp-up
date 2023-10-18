import { call, put, takeLatest } from "redux-saga/effects";
import { userActions } from "./userSlice";
import { api } from "../../api/api";
import { PayloadAction } from "@reduxjs/toolkit";

interface IData {
  id: number;
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface IUserData {
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface IUserResponse {
  data: {
    message: string;
    data: IUserData[];
  };
}

function* fetchUser() {
  try {
    const response: IUserResponse = yield call(api.get, "/users");
    yield put(userActions.setUserEntries(response.data.data));
  } catch (e) {
    alert("Error fetching user data " + e);
  }
}

function* addAndUpdateUser(action: PayloadAction<IData>) {
  const data = action.payload;

  const userData = {
    roleType: data.roleType,
    name: data.name,
    address: data.address,
    email: data.email,
    mobileNumber: data.mobileNumber,
    dob: data.dob,
    password: data.password,
    gender: data.gender,
  };

  const isUpdate: boolean = data.id !== -1;

  try {
    if (isUpdate) {
      yield call(api.put, `/users/${data.email}`, userData);
    } else {
      yield call(api.post, "/users", userData);
    }
    yield put(userActions.fetchUser());
  } catch (e) {
    alert("Error adding/updating user data " + e);
  }
}

function* deleteUser(action: PayloadAction<string>) {
  try {
    const email = action.payload;
    yield call(api.delete, `/users/ ${email}`);
    yield put(userActions.fetchUser());
  } catch (e) {
    alert("Error deleting user data " + e);
  }
}

export function* userSaga() {
  yield takeLatest(userActions.fetchUser.type, fetchUser);
  yield takeLatest(userActions.updateUserEntry.type, addAndUpdateUser);
  yield takeLatest(userActions.deleteUserEntry.type, deleteUser);
}

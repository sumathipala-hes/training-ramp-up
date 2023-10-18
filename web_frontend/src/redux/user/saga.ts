import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { userActions } from "./slice";

interface IUserData {
  email: string;
  name: string;
  password: string;
  role: string;
  isUpdate: boolean;
}

interface IUser {
  email: string;
  name: string;
  password: string;
  role: string;
}

interface IResponse {
  data: IUser[];
}

function* saveAndUpdateUser(action: PayloadAction<IUserData>) {
  const { email, name, password, role, isUpdate } = action.payload;

  const user: IUser = {
    email: email,
    name: name,
    password: password,
    role: role,
  };

  alert("saveAndUpdateUser");
  try {
    yield call(isUpdate ? api.put : api.post, `/user/${isUpdate ? email : "add"}`, user, {
      headers: { "Content-Type": "application/json" },
    });
    yield put(userActions.fetchUser());
  } catch (error) {
    alert(error);
  }
}

function* getAllUsers() {
  try {
    const response: IResponse = yield call(api.get, "/user");
    yield put(userActions.setUser(response.data));
  } catch (error) {
    alert(error);
  }
}

function* deleteUser(action: PayloadAction<string>) {
  const email = action.payload;

  try {
    yield call(api.delete, `/user/${email}`);
  } catch (error) {
    alert(error);
  }
}

export function* userSaga() {
  yield takeEvery(userActions.fetchUser.type, getAllUsers);
  yield takeEvery(userActions.saveAndUpdateUser, saveAndUpdateUser);
  yield takeEvery(userActions.removeUser, deleteUser);
}

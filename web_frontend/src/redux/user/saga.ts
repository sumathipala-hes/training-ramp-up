import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { userActions } from "./slice";
import { AxiosResponse } from "axios";

interface IUserData {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
}

interface ISignInData {
  email: string;
  password: string;
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
  const { email, name, password, role } = action.payload;

  const user: IUser = {
    email: email,
    name: name,
    password: password,
    role: role,
  };

  const isUpdate: boolean = email != "";
  try {
    yield call(isUpdate ? api.put : api.post, `/user/${isUpdate ? email : "add"}`, user, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
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
    yield call(api.delete, `/user/del/${email}`, {
      withCredentials: true,
    });
  } catch (error) {
    alert(error);
  }
}

function* signIn(action: PayloadAction<ISignInData>) {
  try {
    const res: AxiosResponse = yield call(api.post, "/user/signIn", action.payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (res.data.message == "Login Success") {
      yield put(userActions.setCurrentUserData(action.payload.email));
      yield put(userActions.setAuthenticated(true));
      console.log(res.headers["set-cookie"]);
    }
  } catch (error) {
    alert(error);
  }
}

function* setCurrentUserData(action: PayloadAction<string>) {
  try {
    const res: AxiosResponse = yield call(api.get, "/user/" + action.payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(res.data);
    yield put(userActions.setCurrentUserRole(res.data.role));
    yield put(userActions.setCurrentUsername(res.data.name));
  } catch (error) {
    alert(error);
  }
}

export function* userSaga() {
  yield takeEvery(userActions.fetchUser.type, getAllUsers);
  yield takeEvery(userActions.saveAndUpdateUser, saveAndUpdateUser);
  yield takeEvery(userActions.removeUser, deleteUser);
  yield takeEvery(userActions.signIn, signIn);
  yield takeEvery(userActions.setCurrentUserData, setCurrentUserData);
}

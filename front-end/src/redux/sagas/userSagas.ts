import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { newUser } from "../../components/AddNewUserDialog/AddNewUserDialog";
import {
  addUser,
  registedEmailCheck,
  setRegistedEmail,
  createPassword,
  login,
  setUserDetails,
  verifyToken,
  registerUser,
  IregisterUser,
  logOut,
  setLoginError,
} from "../slices/userSlice";
axios.defaults.withCredentials = true;

function* addUserSaga(
  action: PayloadAction<newUser>
): Generator<any, any, any> {
  try {
    yield call(
      axios.post<newUser>,
      `${process.env.REACT_APP_API_URL}/users/adduser`,
      action.payload
    );
  } catch (error) {
    console.log(error);
  }
}

function* registedEmailCheckSaga(
  action: PayloadAction<string>
): Generator<any, any, any> {
  try {
    const { data: response } = yield call(
      axios.get<any>,
      `${process.env.REACT_APP_API_URL}/users/check/${action.payload}`
    );
    yield put(setRegistedEmail(response.registeredEmail));
  } catch (error) {
    console.log(error);
  }
}

function* createPasswordSaga(
  action: PayloadAction<{ token: string; password: string }>
): Generator<any, any, any> {
  console.log(action.payload, "createPasswordSaga");
  try {
    yield call(
      axios.post<any>,
      `${process.env.REACT_APP_API_URL}/users/createpassword`,
      action.payload
    );
  } catch (error) {
    console.log(error);
  }
}

function* loginSaga(
  action: PayloadAction<{ email: string; password: string }>
): Generator<any, any, any> {
  try {
    const response = yield call(
      axios.post<any>,
      `${process.env.REACT_APP_API_URL}/users/login`,
      action.payload
    );
    if (response.status === 200) {
      yield put(setLoginError(false));
      yield put(verifyToken());
    } else {
      yield put(setLoginError(true));
    }
  } catch (error) {
    yield put(setLoginError(true));
    console.log(error);
  }
}

function* verifyTokenSaga(): Generator<any, any, any> {
  try {
    const response = yield call(
      axios.get<any>,
      `${process.env.REACT_APP_API_URL}/users/verify`
    );
    if (response.status === 200) {
      yield put(setUserDetails(response.data.userDetails));
      yield put(setLoginError(false));
    } else {
      yield put(setUserDetails(null));
      yield put(setLoginError(true));
    }
  } catch (error) {
    yield put(setLoginError(true));
    console.log(error);
  }
}

function* registerUserSaga(
  action: PayloadAction<IregisterUser>
): Generator<any, any, any> {
  try {
    yield call(
      axios.post<any>,
      `${process.env.REACT_APP_API_URL}/users/registerUser`,
      action.payload
    );
  } catch (error) {
    console.log(error);
  }
}

function* logOutSaga(): Generator<any, any, any> {
  try {
    const response = yield call(
      axios.post<any>,
      `${process.env.REACT_APP_API_URL}/users/logout`
    );
    if (response.status === 200) {
      yield put(setUserDetails(null));
      yield put(setLoginError(true));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* watchUserSaga() {
  yield takeLatest(addUser.type, addUserSaga);
  yield takeLatest(registedEmailCheck.type, registedEmailCheckSaga);
  yield takeLatest(createPassword.type, createPasswordSaga);
  yield takeLatest(login.type, loginSaga);
  yield takeEvery(verifyToken.type, verifyTokenSaga);
  yield takeLatest(registerUser.type, registerUserSaga);
  yield takeLatest(logOut.type, logOutSaga);
}

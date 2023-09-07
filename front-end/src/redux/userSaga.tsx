import { call, put, takeLatest } from 'redux-saga/effects';
import { authenticateApi, loginApi, logoutApi, registerApi } from '../api/AuthApi/AuthApi';
import {
  registerUser,
  setAuthStatus,
  setAxiosError,
  setAxiosResponse,
  loginUser,
  setCreatedUserStatus,
  setCreateUserError,
  logoutUser,
} from './userSlice';
import { AxiosResponse } from 'axios';

function* registerUserSaga( action: ReturnType<typeof registerUser> ): Generator<any, AxiosResponse | void, AxiosResponse> {
  const { username: userEmail, password: userPassword, role: userRole } = action.payload;
  try {
    const response = yield call(registerApi, userEmail, userPassword, userRole);
    const isAuthenticated = yield call(authenticateApi);
    yield put(setAuthStatus(isAuthenticated));
    yield put(setAxiosResponse(response));
  } catch (error) {
    yield put(setAxiosError(error));
  }
}

function* loginUserSaga( action: ReturnType<typeof loginUser> ): Generator<any, AxiosResponse | void, AxiosResponse> {
  const { username: userEmail, password: userPassword } = action.payload;
  try {
    const response = yield call(loginApi, userEmail, userPassword);
    const isAuthenticated = yield call(authenticateApi);
    yield put(setAuthStatus(isAuthenticated));
    yield put(setAxiosResponse(response));
  } catch (error) {
    yield put(setAxiosError(error));
    yield put(setAuthStatus(false));
  }
}

function* createByAdminSaga( action: ReturnType<typeof registerUser> ): Generator<any, AxiosResponse | void, AxiosResponse> {
  const { username: userEmail, password: userPassword, role: userRole } = action.payload;
  try {
    yield call(registerApi, userEmail, userPassword, userRole);
    yield put(setCreatedUserStatus(true));
  } catch (error) {
    yield put(setCreateUserError(error));
  }
}

function* logoutUserSaga(): Generator<any, void, AxiosResponse> {
  try {
    yield call(logoutApi);
  } catch (error) {
    yield put(setAuthStatus(false));
  }
}

export default function* userSaga() {
  yield takeLatest(registerUser, registerUserSaga);
  yield takeLatest(loginUser, loginUserSaga);
  yield takeLatest(registerUser, createByAdminSaga);
  yield takeLatest(logoutUser, logoutUserSaga);
}
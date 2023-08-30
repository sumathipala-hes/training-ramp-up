import { call, put, takeLatest } from "redux-saga/effects";
import { authenticateApi, loginApi, registerApi } from "../api/authApi";
import { registerUser, authenticateUser, setAuthStatus, setAxiosError, setAxiosResponse, loginUser, setCreatedUserStatus } from "./userSlice";
import { AxiosResponse } from "axios";

function* registerUserSaga(action: ReturnType<typeof registerUser>,): Generator<any, AxiosResponse | void, AxiosResponse> {
  const { username: userEmail, password: userPassword, role: userRole} = action.payload;
    
  try {
    const response = yield call(registerApi, userEmail, userPassword, userRole);
    yield put(setAxiosResponse(response))
    localStorage.setItem('token', response.data.token);

  } catch (error) {
    yield put(setAxiosError(error))
  }
}

function* loginUserSaga(action: ReturnType<typeof loginUser>,): Generator<any, AxiosResponse | void, AxiosResponse> {
  const { username: userEmail, password: userPassword } = action.payload;
    
  try {
    const response = yield call(loginApi, userEmail, userPassword);
    yield put(setAxiosResponse(response))
    localStorage.setItem('token', response.data.token);

  } catch (error) {
    yield put(setAxiosError(error))
  }
}

function* createByAdminSaga(action: ReturnType<typeof registerUser>,): Generator<any, AxiosResponse | void, AxiosResponse> {
  const { username: userEmail, password: userPassword, role: userRole} = action.payload;
    
  try {
    yield call(registerApi, userEmail, userPassword, userRole);
    yield put(setCreatedUserStatus(true))

  } catch (error) {
    yield put(setAxiosError(error))
  }
}

function* authenticateUserSaga(): Generator<any, void, AxiosResponse> {
  try {
    const isAuthenticated = yield call(authenticateApi)
    yield put(setAuthStatus(isAuthenticated))
  } catch (error) {
    yield put(setAuthStatus(false))
  }
}

export default function* userSaga() {
    yield takeLatest(registerUser.type, registerUserSaga);
    yield takeLatest(loginUser.type, loginUserSaga);
    yield takeLatest(registerUser.type, createByAdminSaga);
    yield takeLatest(authenticateUser.type, authenticateUserSaga);
    
  }

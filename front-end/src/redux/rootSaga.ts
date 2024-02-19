import { all, fork } from "redux-saga/effects";
import watchUserSaga from "./sagas/userSagas";
import watchStudentSage from "./sagas/studentSagas";

export default function* rootSaga() {
  try {
    yield all([fork(watchUserSaga), fork(watchStudentSage)]);
  } catch (error: any) {
    throw new Error("Error in rootSaga");
  }
}

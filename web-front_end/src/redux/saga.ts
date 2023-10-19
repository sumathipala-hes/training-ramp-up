import { all } from "redux-saga/effects";
import { studentSaga } from "./student/studentSaga";
import { userSaga } from "./user/userSaga";

export default function* rootSaga() {
  yield all([studentSaga(),userSaga()]);
}

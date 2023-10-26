import { all } from "redux-saga/effects";
import { studentSaga } from "./student/studentSaga";

export default function* rootSaga() {
  yield all([studentSaga()]);
}

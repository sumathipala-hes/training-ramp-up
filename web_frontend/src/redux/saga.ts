import { all } from "redux-saga/effects";
import { studentSaga } from "./student/saga";

export default function* rootSaga(): Generator {
  yield all([studentSaga()]);
}

import { all } from "redux-saga/effects";
import { studentSaga } from "./student/saga";
import { userSaga } from "./user/saga";

export default function* rootSaga(): Generator {
  yield all([studentSaga(), userSaga()]);
}

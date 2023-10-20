import { all } from "redux-saga/effects";
import studentSaga from "./student/studentSaga";
import userSaga from "./user/userSaga";

// Combine all your sagas into a root saga
function* rootSaga() {
    yield all([userSaga(), studentSaga()]);
}

export default rootSaga;

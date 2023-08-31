import { all } from 'redux-saga/effects';
import {addStuSaga, getStuSaga, removeStuSaga, updateStuSaga} from './stuSaga';
import { authUserSaga, authoUserSaga, logOutUserSaga, registerUserSaga } from './userSaga';

//set sagas
export default function* rootSaga() {
  yield all([
    addStuSaga(),
    updateStuSaga(),
    removeStuSaga(),
    getStuSaga(),
    authUserSaga(),
    authoUserSaga(),
    registerUserSaga(),
    logOutUserSaga(),
  ]);
}
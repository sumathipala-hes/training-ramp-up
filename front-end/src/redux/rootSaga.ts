import { all } from 'redux-saga/effects';
import {addStuSaga, getStuSaga, removeStuSaga, updateStuSaga} from './saga';

//set sagas
export default function* rootSaga() {
  yield all([
    addStuSaga(),
    updateStuSaga(),
    removeStuSaga(),
    getStuSaga(),
  ]);
}
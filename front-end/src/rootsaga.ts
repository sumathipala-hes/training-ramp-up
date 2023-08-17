import { all } from 'redux-saga/effects'
import { addStuSaga, deleteStuSaga, fetchStuSaga } from './sagas'

//set sagas
export default function* rootSaga() {
    yield all([addStuSaga(), deleteStuSaga(), fetchStuSaga()])
}

import { all } from 'redux-saga/effects'
import {
    addStuSaga,
    addUserSagaToRoot,
    deleteStuSaga,
    fetchStuSaga,
    logUserSagaToRoot,
} from './sagas'

//set sagas
export default function* rootSaga() {
    yield all([
        addStuSaga(),
        deleteStuSaga(),
        fetchStuSaga(),
        addUserSagaToRoot(),
        logUserSagaToRoot(),
    ])
}

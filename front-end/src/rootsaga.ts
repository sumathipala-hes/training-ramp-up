import { all } from 'redux-saga/effects'
import {
    addStuSaga,
    deleteStuSaga,
    fetchStuSaga,
} from './util/sagas/studentSagas'
import {
    changeUserRoleSagaToRoot,
    deleteUserSagaToRoot,
    fetchUsersSagaToRoot,
} from './util/sagas/userSaga'
import {
    addUserSagaToRoot,
    logOutSagaToRoot,
    logUserSagaToRoot,
} from './util/sagas/authSagas'

//set sagas
export default function* rootSaga() {
    yield all([
        addStuSaga(),
        deleteStuSaga(),
        fetchStuSaga(),
        addUserSagaToRoot(),
        logUserSagaToRoot(),
        deleteUserSagaToRoot(),
        changeUserRoleSagaToRoot(),
        fetchUsersSagaToRoot(),
        logOutSagaToRoot(),
    ])
}

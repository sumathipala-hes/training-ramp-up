/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit'
import {
    SignUpState,
    signUpSuccessful,
    signUpSuccessfulState,
    signUpUser,
} from '../../Components/SignUpPage/SignUpSlice'
import {
    LogInState,
    logInAssignRole,
    logInSuccessfulState,
    logInSuccessfull,
    logInUser,
} from '../../Components/LogInPage/LogInSlice'
import { put, takeEvery } from 'redux-saga/effects'

const API_BASE_URL = 'http://localhost:5000'

function* addUserSaga(
    action: PayloadAction<SignUpState>
): Generator<any, any, any> {
    try {
        const response = yield fetch(`${API_BASE_URL}/api/user/sign-up`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        })

        const data = yield response.json()
        if (data.status === 'success') {
            yield put(logInSuccessfull(data.status))
            yield put(signUpSuccessful(data.data.user.roles[0]))
            yield put(signUpSuccessfulState(true))
            // const jwtToken = data.token
            // yield localStorage.setItem('jwtToken', 'Bearer ' + jwtToken)
        }
        console.log(data)
    } catch (error) {
        console.error('Error Adding User:', error)
    }
}

function* logInSaga(
    action: PayloadAction<LogInState>
): Generator<any, any, any> {
    try {
        const response = yield fetch(`${API_BASE_URL}/api/user/log-in`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        })

        const data = yield response.json()
        if (data.status === 'success') {
            yield put(logInSuccessfull(data.status))
            yield put(logInAssignRole(data.data.user.roles[0]))
            yield put(logInSuccessfulState(true))
            // const jwtToken = data.token
            // yield localStorage.setItem('jwtToken', 'Bearer ' + jwtToken)
        }
        console.log(data)
    } catch (err) {
        console.error('Error Logging In User:', err)
    }
}

function* addUserSagaToRoot() {
    yield takeEvery(signUpUser, addUserSaga)
}

function* logUserSagaToRoot() {
    yield takeEvery(logInUser, logInSaga)
}

export { addUserSagaToRoot, logUserSagaToRoot }

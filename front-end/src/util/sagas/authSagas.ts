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
    logOutInvoke,
    setAuthState,
} from '../../Components/LogInPage/LogInSlice'
import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { NewUserState, createUser } from '../../Components/Users/NewUserSlice'

const API_BASE_URL = 'http://localhost:5000'

function* addUserSaga(
    action: PayloadAction<SignUpState>
): Generator<any, any, any> {
    try {
        const response = yield axios.post(
            `${API_BASE_URL}/api/user/sign-up`,
            JSON.stringify(action.payload),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )

        if (response.data.status === 'success') {
            yield put(setAuthState(true))
            yield put(logInSuccessfull(response.data.status))
            yield put(signUpSuccessful(response.data.data.user.roles[0]))
            yield put(signUpSuccessfulState(true))
        }
        console.log(response.data)
    } catch (error) {
        console.error('Error Adding User:', error)
    }
}

function* logInSaga(
    action: PayloadAction<LogInState>
): Generator<any, any, any> {
    try {
        const response = yield axios.post(
            `${API_BASE_URL}/api/user/log-in`,
            JSON.stringify(action.payload),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )

        if (response.data.status === 'success') {
            yield put(setAuthState(true))
            yield put(logInSuccessfull(response.data.status))
            yield put(logInAssignRole(response.data.data.user.roles[0]))
            yield put(logInSuccessfulState(true))
        }
        console.log(response.data)
    } catch (err) {
        console.error('Error Logging In User:', err)
    }
}

function* logOutSaga(): Generator<any, any, any> {
    try {
        yield fetch(`${API_BASE_URL}/api/user/log-out`, {
            method: 'POST',
            credentials: 'include',
        })
        yield put(setAuthState(false))
    } catch (err) {
        console.log(err)
    }
}

function* registerUserSaga(
    action: PayloadAction<NewUserState>
): Generator<any, any, any> {
    try {
        const response = yield axios.post(
            `${API_BASE_URL}/api/user/register-user`,
            JSON.stringify(action.payload),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )
        console.log(response.data)
    } catch (error) {
        console.error('Error Adding User:', error)
    }
}

axios.interceptors.response.use(
    async (res) => {
        console.log('Interceptor Ran With Response')

        return res
    },
    async function (error) {
        if (error.message === 'Request failed with status code 402') {
            await fetch(`${API_BASE_URL}/api/user/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
        }
    }
)

function* addUserSagaToRoot() {
    yield takeEvery(signUpUser, addUserSaga)
}

function* registerUserSagaToRoot() {
    yield takeEvery(createUser, registerUserSaga)
}

function* logUserSagaToRoot() {
    yield takeEvery(logInUser, logInSaga)
}

function* logOutSagaToRoot() {
    yield takeEvery(logOutInvoke, logOutSaga)
}

export {
    addUserSagaToRoot,
    logUserSagaToRoot,
    logOutSagaToRoot,
    registerUserSagaToRoot,
}

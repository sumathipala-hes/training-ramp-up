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
import { NewUserState, createUser } from '../../Components/Users/NewUserSlice'
import axiosInstance from '../axiosInstance'

function* addUserSaga(
    action: PayloadAction<SignUpState>
): Generator<any, any, any> {
    try {
        const response = yield axiosInstance.post(
            `/users/sign-up`,
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
        const response = yield axiosInstance.post(
            `/users/sign-in`,
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
        console.log('Log out saga invoked')
        yield axiosInstance(`/users/log-out`, {
            method: 'POST',
            withCredentials: true,
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
        const response = yield axiosInstance.post(
            `/users/register`,
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

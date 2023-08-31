/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridRowId, GridRowModel } from '@mui/x-data-grid'
import {
    deleteRow,
    fetchRows,
    updateRow,
    setFetchedRows,
} from './Components/GridTable/GridSlice'
import { put } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery } from 'redux-saga/effects'
import {
    SignUpState,
    signUpSuccessful,
    signUpSuccessfulState,
    signUpUser,
} from './Components/SignUpPage/SignUpSlice'
import {
    LogInState,
    logInSuccessfulState,
    logInSuccessfull,
    logInUser,
} from './Components/LogInPage/LogInSlice'
// import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5000'

function* addRowSaga(
    action: PayloadAction<GridRowModel>
): Generator<any, any, any> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isSave, isNew, dateOfBirth, mobileNumber, ...dataToSend } =
            action.payload
        const mobile_number = mobileNumber
        // Calculate age based on dateOfBirth
        const birthYear = dateOfBirth.getFullYear()
        const currentYear = new Date().getFullYear()
        const age = currentYear - birthYear

        // Convert age to string
        const ageString = age.toString()

        // Format dateOfBirth to "MM/DD/YYYY" format
        const formattedDateOfBirth = dateOfBirth.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })

        const modifiedData = {
            ...dataToSend,
            mobile_number,
            date_of_birth: formattedDateOfBirth,
            age: ageString, // Include age in the modified data
        }
        console.log(modifiedData, isNew)
        if (!isNew) {
            const response = yield fetch(
                `${API_BASE_URL}/api/student/${action.payload.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(modifiedData),
                }
            )
            const data = yield response.json()
            const modifiedJsonData = data.map(
                (item: {
                    id: any
                    name: any
                    age: any
                    date_of_birth: any
                    gender: any
                    mobile_number: any
                    address: any
                }) => ({
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    dateOfBirth: item.date_of_birth,
                    gender: item.gender,
                    mobileNumber: item.mobile_number,
                    address: item.address,
                })
            )
            yield put(updateRow(modifiedJsonData))
        } else if (isNew) {
            const response = yield fetch(`${API_BASE_URL}/api/student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modifiedData),
            })
            const data = yield response.json()
            const modifiedJsonData = data.map(
                (item: {
                    id: any
                    name: any
                    age: any
                    date_of_birth: any
                    gender: any
                    mobile_number: any
                    address: any
                }) => ({
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    dateOfBirth: item.date_of_birth,
                    gender: item.gender,
                    mobileNumber: item.mobile_number,
                    address: item.address,
                })
            )
            yield put(updateRow(modifiedJsonData))
        }

        console.log(action.payload)
    } catch (error) {
        console.error('Error adding row:', error)
    }
}

function* fetchRowsSaga(): Generator<any, any, any> {
    try {
        const jwtToken = localStorage.getItem('jwtToken')
        if (!jwtToken) {
            localStorage.setItem('AuthSuccess', 'fail')
            localStorage.setItem(
                'AuthSuccessMessage',
                `You're Not Authenticated to Access this Page,Please Log In and Try Again`
            )
            return
        }
        // Use an empty string as a default
        const headers = { Authorization: jwtToken }

        const response = yield fetch(`${API_BASE_URL}/api/student`, {
            method: 'GET',
            headers,
        })
        const data = yield response.json()
        if (yield data.status === 'fail') {
            yield localStorage.clear()
            yield localStorage.setItem('AuthSuccess', 'fail')
            yield localStorage.setItem(
                'AuthSuccessMessage',
                `User Is Not Found`
            )
            console.log(
                'Authentication Failed Now I will be navigating you to log in page'
            )
            return
        } else {
            localStorage.setItem('AuthSuccess', 'success')
        }
        // const dataDate = new Date(data.dateofbirth)
        // Modify the data properties
        const modifiedData = data.map(
            (item: {
                id: any
                name: any
                age: any
                date_of_birth: any
                gender: any
                mobile_number: any
                address: any
            }) => ({
                id: item.id,
                name: item.name,
                age: item.age,
                dateOfBirth: item.date_of_birth,
                gender: item.gender,
                mobileNumber: item.mobile_number,
                address: item.address,
            })
        )

        console.log(modifiedData)
        yield put(setFetchedRows(modifiedData))
    } catch (error) {
        yield localStorage.setItem('AuthSuccess', 'fail')
        yield localStorage.setItem(
            'AuthSuccessMessage',
            `You're Not Authenticated to Access this Page,Please Log In and Try Again`
        )
        console.error('Error fetching rows For GridTable:', error)
    }
}

function* deleteRowSaga(
    action: PayloadAction<GridRowId>
): Generator<any, any, any> {
    try {
        const jwtToken = localStorage.getItem('jwtToken')
        if (!jwtToken) {
            localStorage.setItem('AuthSuccess', 'fail')
            localStorage.setItem(
                'AuthSuccessMessage',
                `You're Not Authenticated to Access this Page,Please Log In and Try Again`
            )
            return
        }
        // Use an empty string as a default
        const headers = { Authorization: jwtToken }

        const response = yield fetch(
            `${API_BASE_URL}/api/student/${action.payload}`,
            {
                method: 'DELETE',
                headers,
            }
        )
        console.log('Row is Deleted And User is an Admin')
        if (response.status === 'success') {
            yield put(deleteRow(action.payload))
            return
        }
    } catch (error) {
        console.error('Error deleting row:', error)
    }
}

function* addUserSaga(
    action: PayloadAction<SignUpState>
): Generator<any, any, any> {
    try {
        const response = yield fetch(`${API_BASE_URL}/api/user/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        })
        const data = yield response.json()
        if (data.status === 'success') {
            yield put(signUpSuccessful(data.data.user.roles[0]))
            yield put(signUpSuccessfulState(true))
            const jwtToken = data.token
            console.log(jwtToken)
            yield localStorage.setItem('jwtToken', 'Bearer ' + jwtToken)
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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        })
        const data = yield response.json()
        if (data.status === 'success') {
            yield put(logInSuccessfull(data.data.user.roles[0]))
            yield put(logInSuccessfulState(true))
            const jwtToken = data.token
            console.log(jwtToken)
            yield localStorage.setItem('jwtToken', 'Bearer ' + jwtToken)
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

function* addStuSaga() {
    yield takeEvery(updateRow, addRowSaga)
}

function* fetchStuSaga() {
    yield takeEvery(fetchRows, fetchRowsSaga)
}

function* deleteStuSaga() {
    yield takeEvery(deleteRow, deleteRowSaga)
}

export {
    addStuSaga,
    fetchStuSaga,
    deleteStuSaga,
    addUserSagaToRoot,
    logUserSagaToRoot,
}

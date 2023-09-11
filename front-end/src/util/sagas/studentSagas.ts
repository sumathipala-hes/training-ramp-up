/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridRowId, GridRowModel } from '@mui/x-data-grid'
import {
    deleteRow,
    fetchRows,
    updateRow,
    setFetchedRows,
} from '../../Components/GridTable/GridSlice'
import { put } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery } from 'redux-saga/effects'
import {
    logInAssignRole,
    logInSuccessfull,
} from '../../Components/LogInPage/LogInSlice'
import axios from 'axios'

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
            const response = yield axios.put(
                `${API_BASE_URL}/api/student/${action.payload.id}`,
                JSON.stringify(modifiedData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
            const response = yield axios.post(
                `${API_BASE_URL}/api/student`,
                JSON.stringify(modifiedData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
        }

        console.log(action.payload)
    } catch (error) {
        console.error('Error adding row:', error)
    }
}

function* fetchRowsSaga(): Generator<any, any, any> {
    try {
        const response = yield axios(`${API_BASE_URL}/api/student`, {
            method: 'GET',
            withCredentials: true,
        })

        console.log(response.data)

        if (yield response.data.status === 'fail') {
            yield put(logInSuccessfull(response.data.status))
            yield put(logInAssignRole(response.data.data.user.roles[0]))

            console.log(
                'Authentication Failed Now I will be navigating you to log in page'
            )
            return
        }

        // Modify the data properties
        const modifiedData = yield response.data.map(
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
        return
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
        const response = yield axios(
            `${API_BASE_URL}/api/student/${action.payload}`,
            {
                method: 'DELETE',
                withCredentials: true,
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

axios.interceptors.response.use(
    async (res) => {
        console.log('Interceptor Ran With Response')

        return res
    },
    async function (error) {
        console.log(error.response.data.refreshToken)

        if (error.message === 'Request failed with status code 402') {
            console.log('Sending Post request to refresh-token')
            try {
                const response = await axios(
                    `${API_BASE_URL}/api/user/refresh-token`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                )
                console.log(response)
                return response
            } catch (tokenError) {
                console.error(tokenError)
                return Promise.reject(tokenError)
            }
        } else {
            return Promise.reject(error)
        }
    }
)

function* addStuSaga() {
    yield takeEvery(updateRow, addRowSaga)
}

function* fetchStuSaga() {
    yield takeEvery(fetchRows, fetchRowsSaga)
}

function* deleteStuSaga() {
    yield takeEvery(deleteRow, deleteRowSaga)
}

export { addStuSaga, fetchStuSaga, deleteStuSaga }

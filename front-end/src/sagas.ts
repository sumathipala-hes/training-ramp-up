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

const API_BASE_URL = 'http://localhost:5000'

function* addRowSaga(
    action: PayloadAction<GridRowModel>
): Generator<any, any, any> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isSave, isNew, dateOfBirth, mobileNumber, ...dataToSend } =
            action.payload
        const mobilenumber = mobileNumber
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
            mobilenumber,
            dateofbirth: formattedDateOfBirth,
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
                    dateofbirth: any
                    gender: any
                    mobilenumber: any
                    address: any
                }) => ({
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    dateOfBirth: item.dateofbirth,
                    gender: item.gender,
                    mobileNumber: item.mobilenumber,
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
                    dateofbirth: any
                    gender: any
                    mobilenumber: any
                    address: any
                }) => ({
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    dateOfBirth: item.dateofbirth,
                    gender: item.gender,
                    mobileNumber: item.mobilenumber,
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
        const response = yield fetch(`${API_BASE_URL}/api/student`)
        const data = yield response.json()

        // const dataDate = new Date(data.dateofbirth)
        // Modify the data properties
        const modifiedData = data.map(
            (item: {
                id: any
                name: any
                age: any
                dateofbirth: any
                gender: any
                mobilenumber: any
                address: any
            }) => ({
                id: item.id,
                name: item.name,
                age: item.age,
                dateOfBirth: item.dateofbirth,
                gender: item.gender,
                mobileNumber: item.mobilenumber,
                address: item.address,
            })
        )

        console.log(modifiedData)

        yield put(setFetchedRows(modifiedData))
    } catch (error) {
        console.error('Error fetching rows:', error)
    }
}

function* deleteRowSaga(action: PayloadAction<GridRowId>) {
    try {
        yield fetch(`${API_BASE_URL}/api/student/${action.payload}`, {
            method: 'DELETE',
        })
        yield put(deleteRow(action.payload))
    } catch (error) {
        console.error('Error deleting row:', error)
    }
}

function* addStuSaga() {
    yield takeEvery(updateRow, addRowSaga)
}

// function* updateStuSaga() {
//     yield takeEvery(updateRow, updateRowSaga)
// }

function* fetchStuSaga() {
    yield takeEvery(fetchRows, fetchRowsSaga)
}

function* deleteStuSaga() {
    yield takeEvery(deleteRow, deleteRowSaga)
}

export { addStuSaga, fetchStuSaga, deleteStuSaga }

// Define the initial state
// interface GridState {
//     rows: GridRowModel[]
// }

// const initialState: GridState = {
//     rows: [],
// }

// function* updateRowSaga(
//     action: PayloadAction<GridRowModel>
// ): Generator<any, any, any> {
//     try {
//         const response = yield fetch(
//             `${API_BASE_URL}/api/student/${action.payload.id}`,
//             {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(action.payload),
//             }
//         )
//         const data = yield response.json()
//         yield put(updateRow(data))
//     } catch (error) {
//         console.error('Error updating row:', error)
//     }
// }

// function* watchAddRow() {
//     yield takeEvery(updateRow.type, addRowSaga)
// }

// export default function* rootSaga() {
//     yield watchAddRow()
// }

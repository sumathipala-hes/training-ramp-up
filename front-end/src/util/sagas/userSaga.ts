/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit'
import {
    UserState,
    changeUserRole,
    deleteUser,
} from '../../Components/Users/UsersSlice'
import { put, takeEvery } from 'redux-saga/effects'
import { fetchUsers, setUsersList } from '../../Components/Users/UsersListSlice'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000'

function* deleteUsersaga(
    action: PayloadAction<number>
): Generator<any, any, any> {
    try {
        const response = yield fetch(
            `${API_BASE_URL}/users/${action.payload}`,
            {
                method: 'DELETE',
                credentials: 'include',
            }
        )

        if (response.status === 'success') {
            console.log(`User with the ${action.payload} Id is Deleted`)
            return
        }

        console.log('New User')
    } catch (error) {
        console.error('Error Adding User:', error)
    }
}

function* changeUserRoleSaga(
    action: PayloadAction<UserState>
): Generator<any, any, any> {
    try {
        const response = yield fetch(
            `${API_BASE_URL}/users/${action.payload.userId}`,
            {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(action.payload),
            }
        )

        if (response.status === 200) {
            console.log(`User Role is chnged to ${action.payload.roles}`)
            return
        }
    } catch (err) {
        console.log(err)
    }
}

function* fetchUsersSaga(): Generator<any, any, any> {
    try {
        const response = yield axios(`${API_BASE_URL}/users`, {
            method: 'GET',
            withCredentials: true,
        })
        console.log(response)
        console.log(response.data)
        if (response) {
            localStorage.setItem('AuthSuccess', 'success')
            const data = yield response.data
            yield put(setUsersList(data))
            console.log(data)
        }

        // if (yield data.status === 'fail') {
        //     yield localStorage.clear()
        //     yield localStorage.setItem('AuthSuccess', 'fail')
        //     yield localStorage.setItem(
        //         'AuthSuccessMessage',
        //         `User Is Not Found`
        //     )
        //     console.log(
        //         'Authentication Failed Now I will be navigating you to log in page'
        //     )
        //     return
        // } else {
        //     localStorage.setItem('AuthSuccess', 'success')
        // }
    } catch (err) {
        console.log(err)
    }
}

function* deleteUserSagaToRoot() {
    yield takeEvery(deleteUser, deleteUsersaga)
}

function* changeUserRoleSagaToRoot() {
    yield takeEvery(changeUserRole, changeUserRoleSaga)
}

function* fetchUsersSagaToRoot() {
    yield takeEvery(fetchUsers, fetchUsersSaga)
}

export { deleteUserSagaToRoot, changeUserRoleSagaToRoot, fetchUsersSagaToRoot }

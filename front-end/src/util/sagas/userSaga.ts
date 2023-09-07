/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit'
import {
    UserState,
    changeUserRole,
    deleteUser,
} from '../../Components/Users/UsersSlice'
import { put, takeEvery } from 'redux-saga/effects'
import { fetchUsers, setUsersList } from '../../Components/Users/UsersListSlice'

const API_BASE_URL = 'http://localhost:5000'

function* deleteUsersaga(
    action: PayloadAction<number>
): Generator<any, any, any> {
    try {
        const response = yield fetch(
            `${API_BASE_URL}/api/user/${action.payload}`,
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
            `${API_BASE_URL}/api/user/${action.payload.userId}`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(action.payload),
            }
        )

        if (response.status === 200) {
            console.log(`User Role is chnged to ${action.payload.userRole}`)
            return
        }
    } catch (err) {
        console.log(err)
    }
}

function* fetchUsersSaga(): Generator<any, any, any> {
    try {
        const response = yield fetch(`${API_BASE_URL}/api/user`, {
            method: 'GET',
            credentials: 'include',
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

        console.log(data[0].email)
        yield put(setUsersList(data))
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

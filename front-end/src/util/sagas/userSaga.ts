/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit'
import {
    UserState,
    changeUserRole,
    deleteUser,
} from '../../Components/Users/UsersSlice'
import { put, takeEvery } from 'redux-saga/effects'
import { fetchUsers, setUsersList } from '../../Components/Users/UsersListSlice'
import axiosInstance from '../axiosInstance'

function* deleteUsersaga(
    action: PayloadAction<number>
): Generator<any, any, any> {
    try {
        const response = yield axiosInstance(`/users/${action.payload}`, {
            method: 'DELETE',
            withCredentials: true,
        })

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
        const response = yield axiosInstance.patch(
            `/users/${action.payload.userId}`,
            JSON.stringify(action.payload),
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
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
        const response = yield axiosInstance(`/users`, {
            method: 'GET',
            withCredentials: true,
        })

        if (response) {
            localStorage.setItem('AuthSuccess', 'success')
            const data = yield response.data
            yield put(setUsersList(data))
            console.log(data)
        }
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

import {call, put, takeEvery} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { userActions } from './user/userSlice';
import axiosInstance from '../api/axiosInstance';

interface ResponseType{
    status: number;
    data: {
        status:number;
        data:TableData[];
        error:string
    }
}


//intrerface of card Data
interface TableData {
    id:number;
    name: string;
    gender: string;
    mobile: string;
    birthday: string;
    age : number;
    address : string;
}

interface UserData {
    name:string,
    username:string,
    password:string,
    role:string
}

//authenticate user
function* authenticateUser(action: PayloadAction<UserData>) {
    const { password, username } = action.payload;

    const userData = {
        password,
        username
    };

    try {
        const response: ResponseType = yield call(axiosInstance.post, '/login', userData , {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if (response.data.status === 200) {
            yield put(userActions.setAuth(true));
            yield put(userActions.seterrorMsg(null));
            yield put(userActions.setErrorStatus(false));
        } else {
            yield put(userActions.setAuth(false));
            yield put(userActions.seterrorMsg(response.data.error));
            yield put(userActions.setErrorStatus(true));
        }
    } catch (error:any) {
        yield put(userActions.setAuth(false));
        yield put(userActions.seterrorMsg(error.response.data.error));
        yield put(userActions.setErrorStatus(true));
    }
}

//authorize user
function* authorizeUser(action: PayloadAction<UserData>) {
    try {
        const response: ResponseType = yield call(axiosInstance.post, '/auth', {} , {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if (response.data.status === 200) {
            yield put(userActions.setUser(response.data.data));
            yield put(userActions.setAuth(true));
        } else {
            yield put(userActions.setAuth(false));
        }
    } catch (error:any) {
        yield put(userActions.setAuth(false));
    }
}

function* logOutUser(action: PayloadAction<UserData>) {
    try {
        const response: ResponseType = yield call(axiosInstance.get, '/log-out' , {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if (response.data.status === 200) {

            yield put(userActions.setUser({role:null, name:""}));
            yield put(userActions.setAuth(false));
            yield put(userActions.setErrorStatus(false));
        } else {
            yield put(userActions.setErrorStatus(true));
        }
    } catch (error:any) {
        yield put(userActions.setErrorStatus(true));
    }
}

//register user
function* registerUser(action: PayloadAction<UserData>) {
    const { username, name, password, role } = action.payload;

    const userData = {
        username,
        name,
        password,
        role
    };

    try {
        const response: ResponseType = yield call(axiosInstance.post, '/register', userData , {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if (response.data.status === 200) {
            yield put(userActions.seterrorMsg("user successfully added"));
            yield put(userActions.setErrorStatus(false));
        } else {
            yield put(userActions.seterrorMsg(response.data.error));
            yield put(userActions.setErrorStatus(true));
        }
    } catch (error:any) {
        yield put(userActions.seterrorMsg(error.response.data.error));
        yield put(userActions.setErrorStatus(true));
    }
}


//user saga func
function* authUserSaga(){
    yield takeEvery(userActions.processAuthentication, authenticateUser)
}

function* authoUserSaga(){
    yield takeEvery(userActions.processAuthorization.type, authorizeUser)
}

function* registerUserSaga(){
    yield takeEvery(userActions.register, registerUser)
}

function* logOutUserSaga(){
    yield takeEvery(userActions.processLogOut.type, logOutUser)
}

export {authUserSaga, authoUserSaga, registerUserSaga, logOutUserSaga};
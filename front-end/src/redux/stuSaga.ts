import {call, put, takeEvery} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {tableActions} from './tableData/tableSlice';
import { calculateAge } from '../utils';
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

//add student into the DB
function* addStudent(action: PayloadAction<TableData>) {
    const { id, name, gender, mobile, birthday, address } = action.payload;

    const studentData = {
        id,
        name,
        gender,
        mobile,
        birthday,
        address,
        age : calculateAge(new Date(birthday))
    };
    try {
        yield call(axiosInstance.post, '/students/add-student', studentData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
    }
}

//remove student from the DB
function* removeStudent(action: PayloadAction<TableData>) {
    const studentId = {
        id :action.payload
    };
    try {
        yield call(axiosInstance.post, '/students/remove-student', studentId, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
    }
}

//update student  DB
function* updateStudent(action: PayloadAction<TableData>) {
    const { id, name, gender, mobile, birthday, age,address } = action.payload;

    const studentData = {
        id,
        name,
        gender,
        mobile,
        birthday,
        age,
        address,
    };

    try {
        yield call(axiosInstance.post, '/students/update-student', studentData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    } catch (error) {
    }
}

//get all students' data from DB
function* getStudents(action: PayloadAction<TableData>) {
    try {
        const response: ResponseType = yield call(axiosInstance.get, '/students/get-students', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        yield put(tableActions.initializeStudents(response.data.data));
    } catch (error) {
        console.log(error);
    }
}

//stu saga func
function* addStuSaga(){
    yield takeEvery(tableActions.dbAddStudent, addStudent);
}

function* removeStuSaga(){
  yield takeEvery(tableActions.removeStudent, removeStudent)
}

function* updateStuSaga(){
    yield takeEvery(tableActions.dbUpdateStudent, updateStudent)
}

function* getStuSaga(){
    yield takeEvery(tableActions.fetchStudents.type, getStudents)
}

export {addStuSaga, removeStuSaga, updateStuSaga, getStuSaga};
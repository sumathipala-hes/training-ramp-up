import {call, put, takeEvery} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {tableActions} from './tableData/tableSlice';
import axios from 'axios';

interface ResponseType{
    status: number;
    data: {status:number;data:TableData[];}
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
        yield call(axios.post, 'http://localhost:4000/add-student', studentData, {
            headers: {
                'Content-Type': 'application/json',
            },
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
        yield call(axios.post, 'http://localhost:4000/remove-student', studentId, {
            headers: {
                'Content-Type': 'application/json',
            },
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
        yield call(axios.post, 'http://localhost:4000/update-student', studentData , {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
    }
}

//get all students' data from DB
function* getStudents(action: PayloadAction<TableData>) {
    try {
        const response:ResponseType = yield call(axios.get,'http://localhost:4000/get-students');
        console.log(response.data.data)
        yield put(tableActions.initializeStudents(response.data.data));
    } catch (error) {
        console.log(error);
    }
}


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

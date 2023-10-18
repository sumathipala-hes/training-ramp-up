import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { tableDataActions } from "../tableSlice/tableSlice";

// Define data types
interface ITableData {
    studentId: number;
    studentName: string;
    studentAddress: string;
    studentMobile: string;
    studentDob: string;
    studentGender: string;
}

// Define response types
interface IResponseData {
    data: {
        data: ITableData[];
    };
}

// Define action types
const { fetchTableData, removeTableData , setTableData } =
    tableDataActions;

// Define saga functions
function* getAllTableData() {
    try {
        const response: IResponseData = yield call(api.get, "/student");
        console.log(response.data.data);
        yield put(setTableData(response.data.data));
    } catch (error) {
        alert(error);
    }
}

function* deleteTableData(action: PayloadAction<number>) {
    const id = action.payload;
    try {
        yield call(api.delete, `/student/${id}`);
    } catch (error) {
        alert(error);
    }
}

function* tableDataSaga() {
    yield takeEvery(fetchTableData, getAllTableData);
    yield takeEvery(removeTableData, deleteTableData);
}

function* mySaga() {
    yield all([tableDataSaga()]);
}

export default mySaga;

import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { tableDataActions } from "./studentSlice";

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
const { fetchTableData, removeTableData, updateTableData, setTableData } =
    tableDataActions;

// Define saga functions
function* getAllTableDataRows() {
    try {
        const response: IResponseData = yield call(api.get, "/student");
        console.log(response.data.data);
        yield put(setTableData(response.data.data));
    } catch (e) {
        alert("Loading data failed. Please try again." + e);
    }
}

function* updateTableDataRow(action: PayloadAction<ITableData>) {
    const data = action.payload;
    const isUpdate: boolean = data.studentId !== -1;

    const tableData = {
        studentId: data.studentId,
        studentName: data.studentName,
        studentAddress: data.studentAddress,
        studentMobile: data.studentMobile,
        studentDob: data.studentDob,
        studentGender: data.studentGender,
    };

    try {
        yield call(
            isUpdate ? api.put : api.post,
            `/student/${isUpdate ? data.studentId : ""}`,
            tableData,
        );
        yield call(getAllTableDataRows);
    } catch (e) {
        alert("Saving or Updating data failed. Please try again." + e);
    }
}

function* deleteTableDataRow(action: PayloadAction<number>) {
    const id = action.payload;
    try {
        yield call(api.delete, `/student/${id}`);
        yield call(getAllTableDataRows);
    } catch (e) {
        alert("Deleting data failed. Please try again." + e + id);
    }
}

function* tableDataSaga() {
    yield takeEvery(fetchTableData, getAllTableDataRows);
    yield takeEvery(updateTableData, updateTableDataRow);
    yield takeEvery(removeTableData, deleteTableDataRow);
}

function* mySaga() {
    yield all([tableDataSaga()]);
}

export default mySaga;

import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { userDataActions } from "./userSlice";

// Define data types
interface IUser {
    userName: string;
    userEmail: string;
    userPassword: string;
    role: string;
}

interface IUserData {
    userId: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    role: string;
}

// Define response types
interface IResponseData {
    data: {
        data: IUser[];
    };
}

// Define action types
const { fetchUsersData, removeUserData, updateUserData, setUserData } =
    userDataActions;

// Define saga functions
function* getAllUserDataRows() {
    try {
        const response: IResponseData = yield call(api.get, "/user");
        console.log(response.data.data);
        yield put(setUserData(response.data.data));
    } catch (e) {
        alert("Loading data failed. Please try again." + e);
    }
}

function* updateUserDataRow(action: PayloadAction<IUserData>) {
    const data = action.payload;
    const isUpdate: boolean = data.userEmail !== '';

    const userData: IUser = {
        userName: data.userName,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
        role: data.role,
    };

    try {
        yield call(
            isUpdate ? api.put : api.post,
            `/student/${isUpdate ? data.userEmail : ""}`,
            userData,
        );
        yield call(getAllUserDataRows);
    } catch (e) {
        alert("Saving or Updating data failed. Please try again." + e);
    }
}

function* deleteUserDataRow(action: PayloadAction<string>) {
    const userEmail = action.payload;
    try {
        yield call(api.delete, `/student/${userEmail}`);
        yield call(getAllUserDataRows);
    } catch (e) {
        alert("Deleting data failed. Please try again." + e + userEmail);
    }
}

function* tableUserSaga() {
    yield takeEvery(fetchUsersData, getAllUserDataRows);
    yield takeEvery(updateUserData, updateUserDataRow);
    yield takeEvery(removeUserData, deleteUserDataRow);
}

function* mySaga() {
    yield all([tableUserSaga()]);
}

export default mySaga;

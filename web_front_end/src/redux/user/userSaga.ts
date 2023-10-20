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

interface ISignInData {
    userEmail: string;
    userPassword: string;
}

// Define response types
interface IResponseData {
    data: {
        data: IUser[];
    };

}

// Define action types
const { fetchUsersData, removeUserData, updateUserData, setUserData, signInUserData } =
    userDataActions;

// Define saga functions
function* getAllUserDataRows() {
    try {
        const response: IResponseData = yield call(api.get,"/user");
        console.log(response.data.data);
        yield put(setUserData(response.data.data));
    } catch (e) {
        alert("Loading data failed. Please try again." + e);
    }
}

function* updateUserDataRow(action: PayloadAction<IUserData>) {
    const data = action.payload;
    const isUpdate: boolean = data.userId !== -1;

    const userData: IUser = {
        userName: data.userName,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
        role: data.role,
    };

    try {
        yield call(
            isUpdate ? api.put : api.post,
            `/user/${isUpdate ? data.userEmail : ""}`,
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
        if (userEmail) {
            yield call(api.delete, `/user/${userEmail}`);
            yield call(getAllUserDataRows);
        }
    } catch (e) {
        alert("Deleting data failed. Please try again." + e );
    }
}

function* signInUserDataRow(action: PayloadAction<ISignInData>) {
    const data = action.payload;
    const signInData: ISignInData = {
        userEmail: data.userEmail,
        userPassword: data.userPassword,
    };

    try {
        yield call(api.post, "/user/signIn", signInData);
    } catch (e) {
        alert("Signing in failed. Please try again.");
    }
}

function* tableUserSaga() {
    yield takeEvery(fetchUsersData, getAllUserDataRows);
    yield takeEvery(updateUserData, updateUserDataRow);
    yield takeEvery(removeUserData, deleteUserDataRow);
    yield takeEvery(signInUserData, signInUserDataRow);
}

function* userSaga() {
    yield all([tableUserSaga()]);
}

export default userSaga;

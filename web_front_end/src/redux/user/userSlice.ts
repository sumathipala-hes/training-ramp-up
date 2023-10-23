import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

interface IUserState {
    userEntries: IUser[];
    currentUserRole: string;
    isAuthenticated: boolean;
    currentUserName: string;
    currentUserEmail: string;
}

const initialState: IUserState = {
    userEntries: [],
    currentUserRole: "",
    isAuthenticated: false,
    currentUserName: "",
    currentUserEmail: "",
};

export const userSlice = createSlice({
    name: "userDataList",
    initialState,
    reducers: {
        addUserData(state, action: PayloadAction<IUser>) {
            state.userEntries.unshift(action.payload);
        },
        fetchUsersData() {},
        updateUserData(state, action: PayloadAction<IUserData>) {
            console.log(action.payload);
        },
        removeUserData(state, action: PayloadAction<string>) {
            state.userEntries = state.userEntries.filter(
                (item) => item.userEmail !== action.payload,
            );
        },
        setUserData(state, action: PayloadAction<IUser[]>) {
            state.userEntries = action.payload;
        },
        signInUserData(state, action: PayloadAction<ISignInData>) {
            console.log(action.payload);
        },
        setCurrentUserRoleData(state, action: PayloadAction<string>) {
            state.currentUserRole = action.payload;
        },
        setIsAuthenticatedData(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        setCurrentUserEmailData(state, action: PayloadAction<string>) {
            state.currentUserEmail = action.payload;
        },
        setCurrentUser(state, action: PayloadAction<string>) {
            console.log(action.payload);
        },
        signOutData() {},
    },
});

export const { actions: userDataActions, reducer: userDataReducer } = userSlice;

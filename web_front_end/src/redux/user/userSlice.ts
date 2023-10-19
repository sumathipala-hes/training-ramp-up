import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
    userName: string;
    userEmail: string;
    userPassword: string;
    role: string;
}

interface IUserState {
    userEntries: IUser[];
}

const initialState: IUserState = {
    userEntries: [],
};

export const userSlice = createSlice({
    name: "userDataList",
    initialState,
    reducers: {
        addTableData(state, action: PayloadAction<IUser>) {
            state.userEntries.unshift(action.payload);
        },
        fetchTableData() {},
        updateTableData(state, action: PayloadAction<IUser>) {
            console.log(action.payload);
        },
        removeTableData(state, action: PayloadAction<string>) {
            state.userEntries = state.userEntries.filter(
                (item) => item.userEmail !== action.payload,
            );
        },
        setTableData: (state, action: PayloadAction<IUser[]>) => {
            state.userEntries = action.payload;
        },
    },
});

export const { actions: userDataActions, reducer: userDataReducer } = userSlice;

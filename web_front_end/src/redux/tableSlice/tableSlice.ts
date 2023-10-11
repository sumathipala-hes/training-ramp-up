import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITableData {
    id: number;
    name: string;
    address: string;
    mobile: string;
    dob: string;
    gender: string;
    age: number;
}

interface ITableDataState {
    tableDataEntries: ITableData[];
}

const initialState: ITableDataState = {
    tableDataEntries: [
        {
            id: 1,
            name: "Pahasara",
            address: "Galle",
            mobile: "0717133879",
            dob: new Date("2001-08-04").toDateString(),
            age: 22,
            gender: "Male",
        },
    ],
};

export const tableSlice = createSlice({
    name: "tableDataList",
    initialState,
    reducers: {
        addTableData(state, action: PayloadAction<ITableData>) {
            state.tableDataEntries.unshift(action.payload);
        },
        fetchTableData() {},
    },
});

export const { actions: tableDataActions, reducer: tableDataReducer } =
    tableSlice;

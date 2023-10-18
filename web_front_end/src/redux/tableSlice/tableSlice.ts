import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITableData {
    studentId: number;
    studentName: string;
    studentAddress: string;
    studentMobile: string;
    studentDob: string;
    studentGender: string;
}

interface ITableDataState {
    tableDataEntries: ITableData[];
}

const initialState: ITableDataState = {
    tableDataEntries: [],
};

export const tableSlice = createSlice({
    name: "tableDataList",
    initialState,
    reducers: {
        addTableData(state, action: PayloadAction<ITableData>) {
            state.tableDataEntries.unshift(action.payload);
        },
        fetchTableData() {},
        updateTableData(state, action: PayloadAction<ITableData>) {
            console.log(action.payload);
        },
        removeTableData(state, action: PayloadAction<number>) {
            state.tableDataEntries = state.tableDataEntries.filter(
                (item) => item.studentId !== action.payload,
            );
        },
        setTableData: (state, action: PayloadAction<ITableData[]>) => {
            state.tableDataEntries = action.payload;
        },
    },
});

export const { actions: tableDataActions, reducer: tableDataReducer } =
    tableSlice;

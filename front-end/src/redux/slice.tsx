import { createSlice } from "@reduxjs/toolkit";



export const dataSlice = createSlice({
    name : 'data',
    initialState: { records: [],
        rowModesModel: {},
     },
    reducers: {
        addInitialRows: (state, action) => {
            state.records = action.payload
        },
        addStudent: (state, action) => {
            state.records = action.payload;
        },
        setRowModesModel: (state, action) => {
            const { id, mode, fieldToFocus } = action.payload;
            state.rowModesModel = {...state.rowModesModel, [id]: {mode, fieldToFocus},}
        },
    },
  },);

export const { addInitialRows, addStudent, setRowModesModel } = dataSlice.actions;
export default dataSlice.reducer;
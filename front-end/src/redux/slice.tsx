import { GridRowsProp } from '@mui/x-data-grid';
import { createSlice } from '@reduxjs/toolkit';

export interface DataState {
  records: GridRowsProp;
  rowModesModel: any;
}

const initialState: DataState = {
  records: [],
  rowModesModel: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setRows: (state, action) => {
      state.records = action.payload;
    },
    setRowModesModel: (state, action) => {
      state.rowModesModel = action.payload;
    },

    //api success actions
    getAllStudentsSuccess: (state, action) => {
      state.records = action.payload;
    },
    removeDeletedStudent: (state, action) => {
      state.records = state.records.filter((row) => row.id !== action.payload);
    },
    createStudentSuccess: (state, action) => {
      state.records.push(action.payload);
    },
    updateStudentSuccess: (state, action) => {
      const updatedStudent = action.payload;
      const updatedIndex = state.records.findIndex(
        (row) => row.id === updatedStudent.id,
      );
      if (updatedIndex !== -1) {
        state.records[updatedIndex] = updatedStudent;
      }
    },
  },
});

export const {
  setRows,
  setRowModesModel,
  getAllStudentsSuccess,
  removeDeletedStudent,
  createStudentSuccess,
  updateStudentSuccess,
} = dataSlice.actions;
export default dataSlice.reducer;

import { GridRowsProp } from '@mui/x-data-grid';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DataState {
  records: GridRowsProp;
  rowModesModel: any;
  studentId: number;
  studentData: Student;
}

export interface Student {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: string;
  dob: string;
  age: number;
}

const initialState: DataState = {
  records: [],
  rowModesModel: {},
  studentId: 0,
  studentData: {
    id: 0,
    name: '',
    gender: '',
    address: '',
    mobile: '',
    dob: '',
    age: 0,
  },
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

    getAllStudents: () => {},

    deleteStudent: (state, action) => {
      state.studentId = action.payload;
    },

    updateStudent: (
      state,
      action: PayloadAction<{ id: number; data: Student }>,
    ) => {
      const { id, data } = action.payload;
      state.studentId = id;
      state.studentData = data;
    },

    createStudent: (state, action) => {
      state.studentData = action.payload;
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
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} = dataSlice.actions;
export default dataSlice.reducer;

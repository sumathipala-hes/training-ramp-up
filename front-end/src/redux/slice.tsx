import { GridRowsProp } from '@mui/x-data-grid';
import { createSlice } from '@reduxjs/toolkit';
import { generateID } from '../utils/GenerateIds';

export const initialRows: GridRowsProp = [
  {
    id: generateID(),
    name: 'Ted',
    gender: 'Male',
    address: 'toronto',
    mobile: '767778984',
    dateOfBirth: new Date('1990-01-05').toString(),
  },
  {
    id: generateID(),
    name: 'Rachel',
    gender: 'Female',
    address: 'sydney',
    mobile: '67778988',
    dateOfBirth: new Date('2000-07-25').toString(),
  },
  {
    id: generateID(),
    name: 'Justin',
    gender: 'Male',
    address: 'Ohio',
    mobile: '767778909',
    dateOfBirth: new Date('2002-03-02').toString(),
  },
  {
    id: generateID(),
    name: 'Emma',
    gender: 'Female',
    address: 'toronto',
    mobile: '767778899',
    dateOfBirth: new Date('1995-01-05').toString(),
  },
];


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
      state.records = state.records.filter(row => row.id !== action.payload);
    },
    createStudentSuccess: (state, action) => {
      state.records.push(action.payload);
    },
    updateStudentSuccess: (state, action) => {
      state.records = action.payload;
    },
}});

export const { setRows, setRowModesModel, getAllStudentsSuccess, removeDeletedStudent, createStudentSuccess, updateStudentSuccess } = dataSlice.actions;
export default dataSlice.reducer;

/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateAge } from "../util/generateAgeUtil";

interface IStudentEntry {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNumber: string;
  dateOfBirth: string;
  age: number;
}

interface IStudentState {
  studentEntries: IStudentEntry[];
}

const initialState: IStudentState = {
  studentEntries: [
    {
      id: 1,
      name: "John",
      address: "Galle",
      mobileNumber: "0777123456",
      dateOfBirth: new Date("1990-01-01").toDateString(),
      age: 20,
      gender: "Male",
    },
  ],
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudentEntry: (state, action: PayloadAction<IStudentEntry>) => {
      const data = action.payload;
      state.studentEntries.unshift(data);
    },
    updateStudentEntry: (state, action: PayloadAction<IStudentEntry>) => {
      const data = action.payload;
      data.age = generateAge(data.dateOfBirth);
      const index = state.studentEntries.findIndex(studentEntry => studentEntry.id === data.id);
      state.studentEntries[index] = data;
    },
    deleteStudentEntry: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.studentEntries = state.studentEntries.filter(studentEntry => studentEntry.id !== id);
    },
    fetchStudent: () => {},
  },
});

const studentActions = studentSlice.actions;
const studentReducer = studentSlice.reducer;

export { studentActions, studentReducer };

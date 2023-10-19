import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IStudentEntry {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNumber: string;
  dob: string;
}

interface IStudentState {
  studentEntries: IStudentEntry[];
}

const initialState: IStudentState = {
  studentEntries: [],
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudentEntry: (state, action: PayloadAction<IStudentEntry>) => {
      const data = action.payload;
      state.studentEntries.unshift(data);
    },
    saveAndUpdateStudentEntry: (state, action: PayloadAction<IStudentEntry>) => {
      const data = action.payload;
      const index = state.studentEntries.findIndex(studentEntry => studentEntry.id === data.id);
      state.studentEntries[index] = data;
    },
    fetchStudent: () => {},
    setStudentEntries: (state, action: PayloadAction<IStudentEntry[]>) => {
      state.studentEntries = action.payload;
    },
    deleteStudentEntry: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.studentEntries = state.studentEntries.filter(studentEntry => studentEntry.id !== id);
    },
  },
});

const studentActions = studentSlice.actions;
const studentReducer = studentSlice.reducer;

export { studentActions, studentReducer };

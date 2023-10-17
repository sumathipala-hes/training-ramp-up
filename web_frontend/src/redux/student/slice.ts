import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IStudent {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
}

interface IStudentState {
  studentList: IStudent[];
}

const initialState: IStudentState = {
  studentList: [
    {
      id: 1,
      name: "John",
      address: "USA",
      mobile: "1234567890",
      dob: new Date("1990-01-01").toDateString(),
      gender: "Male",
    },
  ],
};

export const studentSlice = createSlice({
  name: "studentList",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<IStudent>) => {
      const row = action.payload;
      state.studentList.unshift(row);
    },
    removeStudent: (state, action: PayloadAction<number>) => {
      state.studentList = state.studentList.filter(student => student.id != action.payload);
    },
    fetchStudent: () => {},
    updateStudent: (state, action: PayloadAction<IStudent>) => {
      console.log(action.payload);
      console.log(state.studentList);
    },
    setStudent: (state, action: PayloadAction<IStudent[]>) => {
      state.studentList = action.payload;
    },
  },
});

const studentActions = studentSlice.actions;
const studentReducer = studentSlice.reducer;
export { studentActions, studentReducer };

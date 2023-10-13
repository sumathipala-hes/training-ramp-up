import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { generateAge } from "../../util/generateAgeUtil";

interface IStudent {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
  age: number;
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
      age: 20,
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
      const updatedStudent = action.payload;
      updatedStudent.age = generateAge(updatedStudent.dob);
      const updatedList = state.studentList.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student,
      );
      state.studentList = updatedList;
    },
  },
});

const studentActions = studentSlice.actions;
const studentReducer = studentSlice.reducer;
export { studentActions, studentReducer };

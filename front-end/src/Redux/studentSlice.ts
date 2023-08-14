import { GridRowModel } from '@mui/x-data-grid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Row {
//   id: string,
//   name: string,
//   age: number,
//   dof: string,
//   gender: string,
//   address: string,
//   mobile: string,
//   isNew: boolean,
// }

// interface RowState {
//   Rows: Row[];
// }

// const initialState: RowState = {
//   Rows: [],
// };

// const studentSlice = createSlice({
//   name: 'row',
//   initialState,
//   reducers: {
//     addStudent: (state, action: PayloadAction<Row>) => {
//       state.Rows.push(action.payload);
//     },
//     setStudent: (state, action: PayloadAction<Row[]>) => {
//       state.Rows = action.payload;
//     },
//     fetchStudent: () => { },
//   },
// });

// export const { addStudent, setStudent, fetchStudent } = studentSlice.actions;

// Define the initial state
interface GridState {
    rows: GridRowModel[];
}

const initialState: GridState = {
    rows: [],
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<GridRowModel>) => {
      state.rows.push(action.payload);
    },
    setStudent: (state, action: PayloadAction<GridRowModel[]>) => {
      state.rows = action.payload;
    },
    fetchStudent: () => { },
  },
});

export const { addStudent, setStudent, fetchStudent } = studentSlice.actions;
export default studentSlice.reducer;


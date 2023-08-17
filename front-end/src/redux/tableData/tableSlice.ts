import { createSlice} from '@reduxjs/toolkit';

//create interface to accept values to states
interface TableState {
    rows: rowData[];
    id:number
};

interface rowData {
  id:number,
  name: string,
  gender: string,
  address: string,
  mobile: string,
  birthday: string,
  age: number,
}

//set initial state  
const initialState: TableState = { rows:[], id:0 };

//create a slice to update table state
const tableSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    addStudent(state, action) {
      const newRow = action.payload;
      newRow.id = state.id + 1;
      state.rows.unshift(action.payload); 
    },
    removeStudent(state, action) {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    updateStudent(state, action){
      const rowIndex = state.rows.findIndex((row) => row.id === action.payload.id);
      if (rowIndex !== -1) {
        state.rows[rowIndex] = action.payload;
      }
    },
    updateId(state){
      state.id = state.id + 1;
    },
    dbAddStudent(state, action){
      
    },
    dbUpdateStudent(state, action){

    },
    fetchStudents(state){

    },
    initializeStudents(state, action){
      const students = action.payload
      const maxId = Math.max(...students.map((row: { id: number; }) => row.id));
      state.id = maxId;
      state.rows = students;
    }
  },
});

const tableReducer = tableSlice.reducer;
const tableActions = tableSlice.actions;

export {tableReducer, tableActions};

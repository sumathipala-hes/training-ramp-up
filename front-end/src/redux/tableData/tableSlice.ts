import { createSlice} from '@reduxjs/toolkit';
import { rows } from '../../utils';

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

//max id value of the demo data
const maxId = Math.max(...rows.map((row) => row.id));

//set initial state  
const initialState: TableState = { rows:rows, id:maxId };

//create a slice to update table state
const tableSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    addRow(state, action) {
      const newRow = action.payload;
      const maxId = Math.max(...state.rows.map((row) => row.id));
      newRow.id = maxId + 1;
      state.rows.unshift(action.payload); 
    },
    removeRow(state, action) {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    updateRow(state, action){
      const rowIndex = state.rows.findIndex((row) => row.id === action.payload.id);
      state.id = state.id + 1;
      if (rowIndex !== -1) {
        state.rows[rowIndex] = action.payload;
      }
    },
  },
});

const tableReducer = tableSlice.reducer;
const tableActions = tableSlice.actions;

export {tableReducer, tableActions};

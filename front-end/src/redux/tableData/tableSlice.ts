import { createSlice} from '@reduxjs/toolkit';

//create interface to accept values to states
interface UserState {
    rows: rowData[];
};

interface rowData {
  name: string,
  gender: string,
  address: string,
  mobile: number
  birthday: Date,
  age: number,
}

//demo row data
const rows = [
  {
    name: "John",
    gender: "male",
    address: "Jon",
    mobile: 715426257,
    birthday: new Date("2023-06-29"),
    age: 35,
  },
  {
    name: "Alice",
    gender: "female",
    address: "Wonderland",
    mobile: 715426257,
    birthday: new Date("2023-07-19"),
    age: 32,
  },
  {
    name: "Michael",
    gender: "male",
    address: "New York",
    mobile: 715426257,
    birthday: new Date("2023-09-18"),
    age: 38,
  },
  {
    name: "Emma",
    gender: "female",
    address: "London",
    mobile: 715426257,
    birthday: new Date("2023-05-04"),
    age: 27,
  },
  {
    name: "Daniel",
    gender: "male",
    address: "Paris",
    mobile: 715426257,
    birthday: new Date("2023-03-04"),
    age: 34,
  },
  {
    name: "Olivia",
    gender: "female",
    address: "Los Angeles",
    mobile: 715426257,
    birthday: new Date("2023-12-14"),
    age: 30,
  },
  {
    name: "William",
    gender: "male",
    address: "Sydney",
    mobile: 715426257,
    birthday: new Date("2023-11-25"),
    age: 41,
  },
  {
    name: "Sophia",
    gender: "female",
    address: "Berlin",
    mobile: 715426257,
    birthday: new Date("2023-09-10"),
    age: 24,
  },
  {
    name: "Alexander",
    gender: "male",
    address: "Moscow",
    mobile: 715426257,
    birthday: new Date("2022-03-25"),
    age: 36,
  },
];

//set initial state  
const initialState: UserState = { rows:rows };

//create a slice to update table state
const tableSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    addRow(state, action) {
      state.rows.push(action.payload)
    },
  },
});

const tableReducer = tableSlice.reducer;
const tableActions = tableSlice.actions;

export {tableReducer, tableActions};

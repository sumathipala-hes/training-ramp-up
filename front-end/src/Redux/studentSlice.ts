import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Row {
    id: string,
    name: string,
    age: number,
    dof: string,
  gender: string,
  address: string,
  mobile: string,
  isNew: boolean,
}

interface RowState {
  Rows: Row[];
}

const initialState: RowState = {
  Rows: [],
};

const todoSlice = createSlice({
  name: 'row',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Row>) => {
      state.Rows.push(action.payload);
    },
    setTodos: (state, action: PayloadAction<Row[]>) => {
      state.Rows = action.payload;
    },
    fetchTodos: () => {},
  },
});

export const { addTodo, setTodos, fetchTodos } = todoSlice.actions;

export default todoSlice.reducer;


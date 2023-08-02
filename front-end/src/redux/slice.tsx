import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: { records: [], rowModesModel: {} },
  reducers: {
    setRows: (state, action) => {
      state.records = action.payload;
    },
    setRowModesModel: (state, action) => {
      state.rowModesModel = action.payload;
    },
  },
});

export const { setRows, setRowModesModel } = dataSlice.actions;
export default dataSlice.reducer;

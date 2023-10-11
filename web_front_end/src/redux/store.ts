import { configureStore } from "@reduxjs/toolkit";
import { tableDataReducer } from "./tableSlice/tableSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    tableDataList: tableDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;

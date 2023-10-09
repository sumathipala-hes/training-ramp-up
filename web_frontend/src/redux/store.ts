import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { studentReducer } from "./student/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    studentList: studentReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;

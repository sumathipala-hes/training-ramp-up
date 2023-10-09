import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { studentReducer } from "./studentSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;

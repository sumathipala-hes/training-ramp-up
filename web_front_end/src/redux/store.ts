import { configureStore } from "@reduxjs/toolkit";
import { tableDataReducer } from "./tableSlice/tableSlice";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "./tableSaga/tableSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tableDataList: tableDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;

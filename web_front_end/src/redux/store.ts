import { configureStore } from "@reduxjs/toolkit";
import { tableDataReducer } from "./student/studentSlice";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { userDataReducer } from "./user/userSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tableDataList: tableDataReducer,
    userDataList: userDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;

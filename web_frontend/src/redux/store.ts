import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./student/slice";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import { userReducer } from "./user/slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    studentList: studentReducer,
    userList: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;

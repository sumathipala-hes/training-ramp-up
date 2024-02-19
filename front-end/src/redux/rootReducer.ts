import { combineReducers } from "@reduxjs/toolkit";
import studentReducer from "./slices/stdentsSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  students: studentReducer,
  user: userReducer,
});

export default rootReducer;

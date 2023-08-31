import { combineReducers } from '@reduxjs/toolkit';
import {tableReducer} from "./tableData/tableSlice";
import { userReducer } from './user/userSlice';

// Combine reducers
const rootReducer = combineReducers({
    table:tableReducer,
    users:userReducer,
});

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';
import {tableReducer} from "./tableData/tableSlice";
import { usersReducer } from './users/userSlice';

// Combine reducers
const rootReducer = combineReducers({
    table:tableReducer,
    user:usersReducer,
});

export default rootReducer;

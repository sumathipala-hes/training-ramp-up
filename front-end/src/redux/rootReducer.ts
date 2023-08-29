import { combineReducers } from '@reduxjs/toolkit';
import {tableReducer} from "./tableData/tableSlice";

// Combine reducers
const rootReducer = combineReducers({
    table:tableReducer,
});

export default rootReducer;

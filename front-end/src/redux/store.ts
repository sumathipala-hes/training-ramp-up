import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

//configure store
const store = configureStore({
  reducer: rootReducer,
});


export default store;
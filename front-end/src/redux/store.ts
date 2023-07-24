import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootStore';

//configure store
const store = configureStore({
  reducer: rootReducer,
});


export default store;
import { configureStore } from '@reduxjs/toolkit';
import reducers from './studentSlice';

const store = configureStore({
  reducer: {
    table: reducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

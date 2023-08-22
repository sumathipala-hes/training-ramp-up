import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slice';
import createSagaMiddleware from 'redux-saga';
import studentSaga from './saga';
import userReducer from './userSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(studentSaga);

export default store;

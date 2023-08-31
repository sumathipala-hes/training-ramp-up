import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import dataReducer from './slice';
import studentSaga from './saga';
import userReducer from './userSlice';
import userSaga from './userSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(studentSaga);
sagaMiddleware.run(userSaga);

export default store;
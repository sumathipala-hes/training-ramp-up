import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from "redux-saga";
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

//configure store
const store = configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the rootSaga
sagaMiddleware.run(rootSaga);

export default store;





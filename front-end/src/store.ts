import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit'
import gridReducer from './Components/GridTable/GridSlice'
import signUpReducer from './Components/SignUpPage/SignUpSlice'
import logInReducer from './Components/LogInPage/LogInSlice'
import userReducer from './Components/Users/UsersSlice'
import usersListReducer from './Components/Users/UsersListSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootsaga'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const presistConfig = {
    key: 'root',
    storage: storage,
}

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    grid: gridReducer,
    signUp: signUpReducer,
    logIn: logInReducer,
    users: userReducer,
    usersList: usersListReducer,
})

const persistedReducer = persistReducer(presistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

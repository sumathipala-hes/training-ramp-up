import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gridReducer from './Components/GridTable/GridSlice'
import signUpReducer from './Components/SignUpPage/SignUpSlice'
import logInReducer from './Components/LogInPage/LogInSlice'
import userReducer from './Components/Users/UsersSlice'
import usersListReducer from './Components/Users/UsersListSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootsaga'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    grid: gridReducer,
    signUp: signUpReducer,
    logIn: logInReducer,
    users: userReducer,
    usersList: usersListReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

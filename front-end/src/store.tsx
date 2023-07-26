import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gridReducer from './Components/GridTable/GridSlice'

const rootReducer = combineReducers({
    grid: gridReducer,
})
export const store = configureStore({
    reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({})

export const store = configureStore({
    reducer: {
        rootReducer,
        // Add more slices here if needed
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

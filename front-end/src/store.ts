import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gridReducer from './Components/GridTable/GridSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    // Only persist the "createUser" state
}
const rootReducer = combineReducers({
    grid: gridReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

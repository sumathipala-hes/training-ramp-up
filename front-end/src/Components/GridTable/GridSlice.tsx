// gridSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GridRowModel, GridRowId } from '@mui/x-data-grid'
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator'

const roles = ['Male', 'Female', 'Other']
const randomRole = () => {
    return randomArrayItem(roles)
}
// Define the initial state
interface GridState {
    rows: GridRowModel[]
}

const initialState: GridState = {
    rows: [
        {
            id: randomId(),
            name: randomTraderName(),
            age: 28,
            dateOfBirth: new Date(randomCreatedDate()),
            gender: randomRole(),
            mobileNumber: '012345678',
            address: 'Colombo',
        },
        {
            id: randomId(),
            name: randomTraderName(),
            age: 36,
            dateOfBirth: new Date(randomCreatedDate()),
            gender: randomRole(),
            mobileNumber: '012345678',
            address: 'Colombo',
        },
        {
            id: randomId(),
            name: randomTraderName(),
            age: 19,
            dateOfBirth: new Date(randomCreatedDate()),
            gender: randomRole(),
            mobileNumber: '012345678',
            address: 'Colombo',
        },
        {
            id: randomId(),
            name: randomTraderName(),
            age: 28,
            dateOfBirth: new Date(randomCreatedDate()),
            gender: randomRole(),
            mobileNumber: '012345678',
            address: 'Colombo',
        },
        {
            id: randomId(),
            name: new Date(randomCreatedDate()),
            age: 23,
            dateOfBirth: randomCreatedDate(),
            gender: randomRole(),
            mobileNumber: '012345678',
            address: 'Colombo',
        },
    ],
}

// Create the slice
const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        addRow(state, action: PayloadAction<GridRowModel>) {
            state.rows.unshift(action.payload)
        },
        updateRow(state, action: PayloadAction<GridRowModel>) {
            const { id } = action.payload
            const rowIndex = state.rows.findIndex((row) => row.id === id)
            if (rowIndex !== -1) {
                state.rows[rowIndex] = action.payload
            }
        },
        deleteRow(state, action: PayloadAction<GridRowId>) {
            state.rows = state.rows.filter((row) => row.id !== action.payload)
        },
    },
})

// Export the actions and reducer
export const { addRow, updateRow, deleteRow } = gridSlice.actions
export default gridSlice.reducer

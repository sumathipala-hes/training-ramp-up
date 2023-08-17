// gridSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GridRowModel, GridRowId } from '@mui/x-data-grid'

// Define the initial state
interface GridState {
    rows: GridRowModel[]
}

const initialState: GridState = {
    rows: [],
}

// Create the slice
const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        fetchRows: () => {},
        setFetchedRows: (state, action: PayloadAction<GridRowModel[]>) => {
            state.rows = action.payload
        },
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
        deleteRowTableOnly(state, action: PayloadAction<GridRowId>) {
            state.rows = state.rows.filter((row) => row.id !== action.payload)
        },
    },
})

// Export the actions and reducer
export const {
    addRow,
    updateRow,
    deleteRow,
    deleteRowTableOnly,
    fetchRows,
    setFetchedRows,
} = gridSlice.actions
export default gridSlice.reducer

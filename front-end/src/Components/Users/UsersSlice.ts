import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    userId: number
    userRole: [string]
}

const initialState: UserState = {
    userId: 0,
    userRole: [''],
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUser: (state, action: PayloadAction<number>) => {
            state.userId = action.payload
        },
        changeUserRole: (state, action: PayloadAction<UserState>) => {
            state = action.payload
        },
    },
})

export const { deleteUser, changeUserRole } = usersSlice.actions
export default usersSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
    id: number
    email: string
    roles: string
}

export interface UsersListState {
    usersList: User[]
}

const initialState: UsersListState = {
    usersList: [],
}

const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        setUsersList: (state, action: PayloadAction<User[]>) => {
            state.usersList = action.payload
        },
        fetchUsers: () => {},
    },
})

export const { setUsersList, fetchUsers } = usersListSlice.actions
export default usersListSlice.reducer

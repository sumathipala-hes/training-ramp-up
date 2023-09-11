import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface NewUserState {
    email: string
    userName: string
    password: string
}
export interface NewUsers {
    users: NewUserState[]
}
const initialState: NewUsers = {
    users: [],
}

const newUserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<NewUserState>) => {
            console.log(action.payload)
            state.users.push(action.payload)
        },
    },
})

export const { createUser } = newUserSlice.actions
export default newUserSlice.reducer

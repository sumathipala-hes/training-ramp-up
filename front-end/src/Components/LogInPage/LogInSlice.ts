import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SignInState {
    email: string
    password: string
}

const initialState: SignInState = {
    email: '',
    password: '',
}

const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        enteredEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        enteredPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
})

export const { enteredEmail, enteredPassword } = signInSlice.actions
export default signInSlice.reducer

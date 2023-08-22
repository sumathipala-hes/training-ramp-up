import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SignInState {
    email: string
    userName: string
    password: string
    passwordConfirm: string
}

const initialState: SignInState = {
    email: '',
    userName: '',
    password: '',
    passwordConfirm: '',
}

const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        enteredEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        enteredUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
        enteredPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
})

export const { enteredEmail, enteredPassword, enteredUserName } =
    signInSlice.actions
export default signInSlice.reducer

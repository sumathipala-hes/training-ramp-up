import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SignUpState {
    email: string
    userName: string
    password: string
    passwordConfirm: string
}

const initialState: SignUpState = {
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
        enteredPasswordConfirm: (state, action: PayloadAction<string>) => {
            state.passwordConfirm = action.payload
        },
    },
})

export const {
    enteredEmail,
    enteredPassword,
    enteredPasswordConfirm,
    enteredUserName,
} = signInSlice.actions
export default signInSlice.reducer

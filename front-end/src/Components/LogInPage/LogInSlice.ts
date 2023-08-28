import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LogInState {
    email: string
    password: string
}
export interface LogIn {
    users: LogInState[]
    successMessage: string
    successState: boolean
}

const initialState: LogIn = {
    users: [],
    successMessage: '',
    successState: false,
}

const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        logInUser: (state, action: PayloadAction<LogInState>) => {
            state.users.push(action.payload)
        },
        logInSuccessfull: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload
        },
        logInSuccessfulState: (state, action: PayloadAction<boolean>) => {
            state.successState = action.payload
        },
    },
})

export const { logInUser, logInSuccessfull, logInSuccessfulState } =
    signInSlice.actions
export default signInSlice.reducer

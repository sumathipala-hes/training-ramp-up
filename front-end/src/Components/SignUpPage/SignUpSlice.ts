import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SignUpState {
    email: string
    userName: string
    password: string
}
export interface SignUp {
    users: SignUpState[]
    successMessage: string
    successState: boolean
}

const initialState: SignUp = {
    users: [],
    successMessage: '',
    successState: false,
}

const signInSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        signUpUser: (state, action: PayloadAction<SignUpState>) => {
            state.users.push(action.payload)
        },
        signUpSuccessful: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload
        },
        signUpSuccessfulState: (state, action: PayloadAction<boolean>) => {
            state.successState = action.payload
        },
    },
})

export const { signUpUser, signUpSuccessful, signUpSuccessfulState } =
    signInSlice.actions
export default signInSlice.reducer

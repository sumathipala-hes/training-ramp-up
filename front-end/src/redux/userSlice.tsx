import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

interface UserState {
  userEmail: string;
  userPassword: string;
  userRole: string;
  responseData: any;
  errorData: any;
  currentUsername: string;
  currentUserRole: string;
  authStatus: boolean;
  isCreatedUser: boolean;
}

const initialState: UserState = {
  userEmail: '',
  userPassword: '',
  userRole: '',
  responseData: null,
  errorData: null,
  currentUsername: '',
  currentUserRole: '',
  authStatus: false,
  isCreatedUser: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<{ username:string; password: string; role: string }>) => {
      const { username, password, role} = action.payload;
      state.userEmail = username;
      state.userPassword = password;
      state.userRole = role;
    },
    loginUser: (state, action: PayloadAction<{ username:string; password: string; }>) => {
      const { username, password } = action.payload;
      state.userEmail = username;
      state.userPassword = password;
    },
    setAxiosResponse: (state, action: PayloadAction<AxiosResponse<any>>) => {
      state.responseData = action.payload;
    },
    setAxiosError: (state, action) => {
      state.errorData = action.payload;
    },
    authenticateUser: () => {
      
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
    setCurrentUsername: (state, action) => {
      state.currentUsername = action.payload;
    },
    setCurrentUserRole: (state, action) => {
      state.currentUserRole = action.payload;
    },
    clearUserData: (state) => {
      state.userEmail = '';
      state.userPassword = '';
      state.userRole = '';
    },
    setCreatedUserStatus: (state, action) => {
      state.isCreatedUser = action.payload;
    }
  },
});

export const { registerUser, loginUser, setAxiosResponse, setAxiosError, authenticateUser, setAuthStatus, setCurrentUsername, setCurrentUserRole, clearUserData, setCreatedUserStatus } = userSlice.actions;

export default userSlice.reducer;

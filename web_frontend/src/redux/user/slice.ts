import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface IUser {
  email: string;
  name: string;
  password: string;
  role: string;
}

interface IUserData {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
}

interface ISignInData {
  email: string;
  password: string;
}

interface IUserState {
  userList: IUser[];
  isAuthenticated: boolean;
  currentUserRole: string;
  currentUsername: string;
  currentEmail: string;
}

const initialState: IUserState = {
  userList: [],
  isAuthenticated: Cookies.get("accessToken") ? true : false,
  currentUserRole: "user",
  currentUsername: "",
  currentEmail: "",
};

export const userSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      const row = action.payload;
      state.userList.unshift(row);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.userList = state.userList.filter(user => user.email != action.payload);
    },
    fetchUser: () => {},
    saveAndUpdateUser: (state, action: PayloadAction<IUserData>) => {},
    setUser: (state, action: PayloadAction<IUser[]>) => {
      state.userList = action.payload;
    },
    signIn: (state, action: PayloadAction<ISignInData>) => {
      console.log(action.payload);
      console.log(state);
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setCurrentUserRole: (state, action: PayloadAction<string>) => {
      state.currentUserRole = action.payload;
    },
    setCurrentUsername: (state, action: PayloadAction<string>) => {
      state.currentUsername = action.payload;
    },
    setCurrentUserData: (state, action: PayloadAction<string>) => {},
    setCurrentEmail: (state, action: PayloadAction<string>) => {
      state.currentEmail = action.payload;
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export { userActions, userReducer };

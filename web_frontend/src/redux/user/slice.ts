import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
  email: string;
  name: string;
  password: string;
  role: string;
}

interface IUserState {
  userList: IUser[];
}

const initialState: IUserState = {
  userList: [],
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
    updateUser: (state, action: PayloadAction<IUser>) => {
      console.log(action.payload);
      console.log(state.userList);
    },
    setUser: (state, action: PayloadAction<IUser[]>) => {
      state.userList = action.payload;
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export { userActions, userReducer };

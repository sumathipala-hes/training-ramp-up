import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserEntry {
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface IUserState {
  userEntries: IUserEntry[];
  isAuthenticated: boolean;
  currentEmail: string;
  currentRoleType: string;
}

interface ISignInData {
  email: string;
  password: string;
}

const initialState: IUserState = {
  userEntries: [],
  isAuthenticated: false,
  currentEmail: "",
  currentRoleType: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserEntry: (state, action: PayloadAction<IUserEntry>) => {
      const data = action.payload;
      state.userEntries.unshift(data);
    },
    saveAndUpdateUserEntry: (state, action: PayloadAction<IUserEntry>) => {
      const data = action.payload;
      const index = state.userEntries.findIndex(userEntry => userEntry.email === data.email);
      state.userEntries[index] = data;
    },
    fetchUser: () => {},
    setUserEntries: (state, action: PayloadAction<IUserEntry[]>) => {
      state.userEntries = action.payload;
    },
    deleteUserEntry: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      state.userEntries = state.userEntries.filter(userEntry => userEntry.email !== email);
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    signIn(state, action: PayloadAction<ISignInData>) {},
    signOut: () => {},

    setEmail: (state, action: PayloadAction<string>) => {
      state.currentEmail = action.payload;
    },
    setRoleType: (state, action: PayloadAction<string>) => {
      state.currentRoleType = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<string>) => {},
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };

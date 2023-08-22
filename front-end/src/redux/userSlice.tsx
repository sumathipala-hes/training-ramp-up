import { createSlice } from '@reduxjs/toolkit';

const Users = [
  {
    username: 'admin@gmail.com',
    password: '1234',
    role: 'admin',
  },
];

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: Users,
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { setCurrentUser, addUser } = userSlice.actions;

export default userSlice.reducer;

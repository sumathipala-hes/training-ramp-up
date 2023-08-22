import { createSlice} from '@reduxjs/toolkit';
import { userRoles } from '../../utils';

//create interface to accept values to states
interface TableState {
    users: userData[];
    loggedUser:userData;
};

interface userData {
  name:string | null,
  username: string | null,
  role: string | null,
}

//set initial state  
const initialState: TableState = { users:[], loggedUser:{  name:null,username: null,role: null,} };

//create a slice to update table state
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerUser(state, action) {
      const newUser = action.payload;
      if(state.loggedUser.role === userRoles.admin){
        state.users.push(newUser);
      }else{
        newUser.role = userRoles.user;
        state.users.push(newUser);
      }
    },
    signUser(state,action){
        const userDetails = action.payload;
        const users = state.users;
        const foundUser = users.find(user => user.username === userDetails.username);
        if(foundUser){
            state.loggedUser.name = foundUser.name;
            state.loggedUser.username = foundUser.username;
            state.loggedUser.role = foundUser.role;
        }
    }
  },
});

const usersReducer = userSlice.reducer;
const userActions = userSlice.actions;

export {usersReducer, userActions};

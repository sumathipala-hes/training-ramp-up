import { createSlice} from '@reduxjs/toolkit';

//create interface to accept values to states
interface UserState {
    errorStatus:boolean | null;
    errorMsg: string|null;
    user: UserData;
    authenticated:boolean
};

interface UserData {
  role: string|null;
  name:string|null;
};



//set initial state  
const initialState: UserState  = { errorStatus:null, errorMsg:null, user:{role:null, name:""}, authenticated:false};

//create a slice to update table state
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    seterrorMsg(state, action){
      const errorMsg = action.payload;
      state.errorMsg = errorMsg;
    },
    setErrorStatus(state, action){
      state.errorStatus = action.payload;
    },
    setUser(state, action){
      const {role , name} = action.payload;
      state.user.role = role;
      state.user.name = name;
    },
    setAuth(state, action){
      state.authenticated = action.payload;
    },
    processAuthentication(state, action){

    },
    processAuthorization(state){

    },
    register(state,action){

    },
    processLogOut(state){

    },
  },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export {userReducer, userActions};

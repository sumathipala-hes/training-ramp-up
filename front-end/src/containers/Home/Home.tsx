import {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import { routePaths, userRoles } from '../../utils';
import FullStuTable from '../../components/FullStuTable/FullStuTable';
import ViewStuTable from '../../components/ViewStuTable/ViewStuTable';
import React from 'react';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/user/userSlice';

function Home() {

  const dispatch = useDispatch();

  //initialize error status and msg for users
  const authenticated = useSelector((state: {users: any; authenticated:boolean} ) => state.users.authenticated);
  useEffect(() =>{
    dispatch(userActions.processAutho());
   },[]);
  const user = useSelector((state: {users: any; user:boolean} ) => state.users.user);

  if (authenticated) {
    if (user.role === userRoles.admin) {
       return (
        <React.Fragment>
          <Header name={user.name} isAdmin={true} />
          <FullStuTable isTesting={false} />
        </React.Fragment>
       )
    } else {
       return(
        <React.Fragment>
          <Header name={user.name} isAdmin={false} />
          <ViewStuTable isTesting={false} />
        </React.Fragment>  
       )
    }
  } else {
     return (<Navigate to={routePaths.signIn} />);
  }
 }
 
 export default Home;
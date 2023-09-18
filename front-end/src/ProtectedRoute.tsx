import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routePaths, userRoles } from './utils';
import { userActions } from './redux/user/userSlice';
import { Button, Card, Typography } from '@mui/material';

const cardStyles = {
  padding: "20px 50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "16px",
  maxWidth:"400px"
};

// Guard route
function ProtectedRoute(props: { authRequired: any; adminRequired: any; element: any; }) {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const authenticated = useSelector((state: {users: any; authenticated:boolean} ) => state.users.authenticated);
  const user = useSelector((state: {users: any; user:boolean} ) => state.users.user);

  //authorize user
  useEffect(() =>{
      dispatch(userActions.processAuthorization());
  },[]);

    //home button handler
  const homeHandler = () => {
    navigate(routePaths.home);
  };

  // authorization
  if (props.authRequired && !authenticated) {
    return (<Navigate to={routePaths.signIn} />);
  }else if (props.adminRequired && user.role !== userRoles.admin) {
    return(
      <Card variant="outlined" sx={cardStyles}>
          <Typography variant="h4" align="center" >The page is protected. Administrator access is required for entry.</Typography>    
          <Button onClick={homeHandler} size="large" variant="contained" sx={{ borderRadius: "16px", marginTop: "30px" }} >Go Back To Home</Button>
      </Card>
    )
  }else{
    return props.element;
  }
};

export default ProtectedRoute;


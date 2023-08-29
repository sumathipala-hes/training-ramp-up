import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import SignIn from './containers/SignIn/SignIn';
import { Container } from '@mui/material';
import Register from './containers/Register/Register';
import { routePaths } from './utils';
import Admin from './containers/Admin/Admin';
import Home from './containers/Home/Home';

const containerStyles = {
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
  display: "flex",
  flexDirection:"column",
  alignItems: "center",
  justifyContent: "center",
}

function App() {
    // Create a browser router configuration with routes
    const router = createBrowserRouter([
      { path:routePaths.signIn, element:<SignIn/>},
      { path:routePaths.register, element:<Register/>},
      { path:routePaths.home,  element: <Home/>},
      { path:routePaths.admin, element:<Admin/>}
    ]);
    
  return (
    <Container maxWidth="xl" sx={containerStyles}>
          <RouterProvider router = {router}/>
    </Container>

  );
}

export default App;

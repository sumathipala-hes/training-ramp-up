import {
  Alert,
  AlertProps,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, clearUserData, loginUser, setCurrentUsername, setCurrentUserRole } from '../../redux/userSlice';
import React from 'react';

export interface JwtPayload {
  username: string;
  id: number;
  role: string;
}

export const Login = () => {
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoginDisabled = username.trim() === '' || password.trim() === '';

  const response = useSelector((state: any) => state.user.responseData);
  const error = useSelector((state: any) => state.user.errorData);
  const isAuthenticated = useSelector((state: any) => state.user.authStatus);
  
  const handleRegisterClick = () => {
    navigate('/');
  };

  const handleLoginClick = async () => {
    dispatch(loginUser({ username: username, password: password }))
  };

  useEffect(() => {
    if (response) {
      dispatch(authenticateUser())
    } else if (error) {
      if (error instanceof Error && error.message === 'The email address entered is not connected to an account') {
        setSnackbar({ children: error.message, severity: 'error' });
      } else if (error instanceof Error && error.message === 'Wrong Username and Password Combination') {
        setSnackbar({ children: error.message, severity: 'error' });
      } else {
        setSnackbar({ children: 'An error occured. Please try again', severity: 'error' });
      }
    }
  }, [response, error, dispatch, setSnackbar]);

  useEffect(() => {
    if (isAuthenticated) {
      const decoded = jwt_decode(response.data.token) as JwtPayload;
      dispatch(setCurrentUsername(decoded.username));
      dispatch(clearUserData());
      if (decoded.role === 'admin') {
        dispatch(setCurrentUserRole('admin'));
        navigate('/admin');
      } else if (decoded.role === 'user') {
        dispatch(setCurrentUserRole('user'));
        navigate('/main');
      }
    }
});

  return (
    <Box
      sx={{
        height: 'auto',
        alignItems: 'center',
        display: 'flex',
        margin: '100px',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ width: '600px', backgroundColor: '#e1e8e8' }}>
        <Typography
          variant="h5"
          sx={{ marginBottom: '20px', marginTop: '20px' }}
        >
          Login Here
        </Typography>
        <TextField
          required
          variant="filled"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: '15px', width: '500px' }}
        />
        <TextField
          required
          variant="filled"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '15px', width: '500px' }}
        />
        <Box
          sx={{
            margin: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            onClick={handleLoginClick}
            disabled={isLoginDisabled}
            sx={{ marginBottom: '15px', width: '120px' }}
          >
            Login
          </Button>
          <Button variant="text" onClick={handleRegisterClick}>
            Don't have an account?
          </Button>
        </Box>
      </Box>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};

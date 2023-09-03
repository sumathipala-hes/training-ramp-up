import {
  Alert,
  AlertProps,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavigationBar/NavigationBar';
import React from 'react';
import {
  registerUser,
  setCreateUserError,
  setCreatedUserStatus,
} from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isEmailValid, isPasswordValid } from '../../utils/UserValidations';

export const Admin = () => {
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const isCreatedUser = useSelector((state: any) => state.user.isCreatedUser);
  const error = useSelector((state: any) => state.user.createUserError);

  const isCreateUserDisabled =
    username.trim() === '' || password.trim() === '' || role === '';

  const handleCreateUserClick = async () => {
    if (isEmailValid(username)) {
      if (isPasswordValid(password)) {
        dispatch(
          registerUser({ 
            username: username, 
            password: password, 
            role: role 
          }),
        );
      } else {
        setSnackbar({
          children: 'Password should contain at least 6 characters',
          severity: 'error',
        });
      }
    } else {
      setSnackbar({
        children: 'Invalid email. Please enter a valid email',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    if (isCreatedUser) {
      setSnackbar({ children: 'Successfully added user', severity: 'success' });
      dispatch(setCreatedUserStatus(false));
    } else if (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        setSnackbar({ children: 'User already exists', severity: 'error' });
      } else {
        setSnackbar({
          children: 'An error occured. Please try again',
          severity: 'error',
        });
      }
      dispatch(setCreateUserError(false));
    }
  },[isCreatedUser, error]);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          height: 'auto',
          alignItems: 'center',
          display: 'flex',
          marginTop: '100px',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ width: '600px', backgroundColor: '#e1e8e8' }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: '20px', marginTop: '20px' }}
          >
            Add New Users Here
          </Typography>
          <TextField
            required
            variant="outlined"
            placeholder="User Email"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            sx={{ marginBottom: '15px', width: '500px' }}
          />
          <TextField
            required
            variant="outlined"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{ marginBottom: '15px', width: '500px' }}
          />
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <RadioGroup
              row
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <FormControlLabel
                value="admin"
                label="Admin"
                control={<Radio />}
              />
              <FormControlLabel value="user" label="User" control={<Radio />} />
            </RadioGroup>
          </Box>
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
              variant="outlined"
              disabled={isCreateUserDisabled}
              onClick={handleCreateUserClick}
              sx={{ marginTop: '40px', width: '500px' }}
            >
              Create User
            </Button>
          </Box>
        </Box>
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Box>
    </>
  );
};

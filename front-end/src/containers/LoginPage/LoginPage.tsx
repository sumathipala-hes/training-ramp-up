import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../redux/userSlice";

export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLoginDisabled = username.trim() === '' || password.trim() === ''

    const users = useSelector((state: any) => state.user.users);

    const handleRegisterClick = () => {
        navigate('/')
    }

    const handleLoginClick = () => {

        const foundUser = users.find((user: { username: string; password: string; }) => user.username === username && user.password === password);

        if (foundUser) {
            dispatch(setCurrentUser(foundUser));
            if (foundUser.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/main');
            }
        } else {
            alert('No user found for the given username and password');
        }
    }

    return (
        <Box sx={{ height: 'auto', backgroundColor: 'white', alignItems:'center', display: 'flex', padding: '20px', margin: '20px', flexDirection: 'column' }}>
            <Box sx={{ width: '600px', backgroundColor: '#e1e8e8' }}>
                <Typography variant='h5' sx={{ marginBottom: '20px', marginTop: '20px' }}>Login Here</Typography>
                <TextField
                    required
                    variant='filled'
                    label='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ marginBottom: '15px', width: '500px'}}
                />
                <TextField
                    required
                    variant='filled'
                    label='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: '15px', width: '500px'}}
                />
            <Box sx={{ margin: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant='contained' onClick={handleLoginClick} disabled={isLoginDisabled} sx={{ marginBottom: '15px', width: '120px'}}>Login</Button>
                <Button variant='text' size='small' onClick={handleRegisterClick}>Register Here</Button>
            </Box>
            </Box>
        </Box> 
         
    )
}
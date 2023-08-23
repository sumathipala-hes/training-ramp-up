import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { addUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { registerApi } from "../../api/apiService";

export const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const isRegisterDisabled = username.trim() === '' || password.trim() === '' || confirmedPassword.trim() === ''
    const passwordsMatch = password === confirmedPassword;
    const isEmailValid = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }
    
    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleRegisterClick = async () => {
       if (isEmailValid(username)) {
            if (passwordsMatch) {
                const newUser = {
                    username,
                    password,
                    role: 'user'
                };
                dispatch(addUser(newUser))
                //navigate('/main')
                const response = await registerApi(username, password);
                console.log(response)
            } else {
                alert('Passwords do not match')
            }
       } else {
        alert ('Invalid email')
       }
    }
        
    return (
        <Box sx={{ height: 'auto', backgroundColor: '#e1e8e8', alignItems:'flex-start', display: 'flex', padding: '20px', margin: '20px', flexDirection: 'column'}}>
            <Box sx={{ width: '600px', backgroundColor: '#e1e8e8' }}></Box>
            <Typography variant='h5' sx={{ marginBottom: '30px' }}>Register Here</Typography>
            <TextField
                required
                variant='filled'
                label='Email'
                size= 'small'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: '15px', width: '500px'}}
            />
            <Box style={{ display: 'flex', justifyContent: 'flex-start'  }}>
                <TextField 
                    required
                    variant='filled'
                    label='Password'
                    size= 'small'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: '15px', width: '240px', marginRight: '20px'}}
                />
                <TextField 
                    required
                    variant='filled'
                    label='Confirm Password'
                    size= 'small'
                    type='password'
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    sx={{ marginBottom: '15px', width: '240px'}}
                    />
            </Box>

            <Box sx={{ marginTop: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant='contained' onClick={handleRegisterClick} disabled={isRegisterDisabled} sx={{ marginBottom: '10px', width: '500px'}}>Register</Button>
                <Button variant='text' onClick={handleLoginClick}>Already have an account?</Button>
            </Box>
        </Box>  
    )
}
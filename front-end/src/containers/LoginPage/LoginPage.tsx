import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, userAuthenticatedApi } from "../../api/apiService";
import jwt_decode from "jwt-decode"

interface JwtPayload {
    username: string;
    id: number;
    role: string;
}

export const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLoginDisabled = username.trim() === '' || password.trim() === ''

    const handleRegisterClick = () => {
        navigate('/')
    }

    const handleLoginClick = async () => {

        const response = await loginApi(username, password);
        if (response) {
            localStorage.setItem("token", response.data.token );

            const isAuthenticated = await userAuthenticatedApi();
            if (isAuthenticated) {
                const decoded = jwt_decode(response.data.token) as JwtPayload;
                if (decoded.role === "admin") {
                    navigate('/admin');
                } else if (decoded.role === "user") {
                navigate('/main');
                }
            }
        }   

        //const users = useSelector((state: any) => state.user.users);

        // const foundUser = users.find((user: { username: string; password: string; }) => user.username === username && user.password === password);

        // if (foundUser) {

        //     dispatch(setCurrentUser(foundUser));
        //     if (foundUser.role === 'admin') {
        //         navigate('/admin');
        //     } else {
        //         navigate('/main');
        //     }
        // } else {
        //     alert('No user found for the given username and password');
        // }
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
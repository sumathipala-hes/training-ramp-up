import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/userSlice";

export const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('');

    const isCreateUserDisabled = username.trim() === '' || password.trim() === '' || userRole === '';
    const isEmailValid = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    const handleViewUserTable = () => {
        navigate('/main')
    }
    const handleCreateUserClick =  () => {
        if (isEmailValid(username)) {
            const newUser = {
                username,
                password,
                userRole,
            };
            dispatch(addUser(newUser))
            alert ('Successfully added user')
        } else {
            alert ('Invalid email')
        }
    }

    return (
        <Box sx={{ height: 'auto', backgroundColor: '#e1e8e8', display: 'flex', padding: '20px', margin: '20px', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px'}}>
                <Typography variant='h5'>Add Users Here </Typography>
                <Button onClick={handleViewUserTable}>View User Table</Button>
            </Box>
            <TextField
                required
                variant='outlined'
                label='User Email'
                size='small'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                sx={{ marginBottom: '15px', width: '500px'}}
            />
            <TextField
                required
                variant='outlined'
                label='Password'
                size='small'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={{ marginBottom: '15px', width: '500px'}}
            />
            <RadioGroup row value={userRole} onChange={(event) => setUserRole(event.target.value)} >
                <FormControlLabel value='admin' label='Admin' control={<Radio />} />
                <FormControlLabel value='user' label='User' control={<Radio />}/>
            </RadioGroup>
            <Button variant='outlined' disabled={isCreateUserDisabled} onClick={handleCreateUserClick} sx={{ marginTop: '40px', width: '500px'}}> Create User</Button>
        </Box>      
    )
}
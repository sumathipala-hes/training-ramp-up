import { Box, Button, Container, TextField } from '@mui/material'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { enteredEmail, enteredPassword, enteredUserName } from './SignUpSlice'

export default function SignUp() {
    const navigate = useNavigate()
    const dispacth = useDispatch()

    const [email, setEmail] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordConfirm, setPasswordConfirm] = React.useState('')

    const handleChangeEmail = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setEmail(event.target.value)
    }

    const handleChangeUserName = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setUserName(event.target.value)
    }

    const handleChangePassword = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setPassword(event.target.value)
    }

    const handleChangePasswordConfirm = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setPasswordConfirm(event.target.value)
    }

    const handleClick = () => {
        navigate('/student-table') // Navigate to the "/other" route
        dispacth(enteredEmail(email))
        dispacth(enteredUserName(userName))
        dispacth(enteredPassword(password))
    }
    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background:
                    'linear-gradient(to right bottom, #430089, #82ffa1)',
            }}
        >
            <Box
                sx={{
                    width: 800,
                    height: 450,
                    border: 1,
                    borderRadius: '15px',
                    borderColor: 'primary.main',
                    backgroundColor: 'white',
                }}
            >
                <Container sx={{ textAlign: 'center' }}>
                    <h1
                        style={{
                            fontFamily: 'Arial ',
                            color: 'blueviolet',
                            fontWeight: 'lighter',
                        }}
                    >
                        Sign Up
                    </h1>
                    <Container>
                        <form>
                            <TextField
                                id="outlined-basic"
                                label="Your Email"
                                variant="outlined"
                                value={email}
                                onChange={handleChangeEmail}
                                sx={{
                                    width: '300px',
                                    marginBottom: '10px',
                                }}
                            ></TextField>
                            <div>
                                <TextField
                                    id="outlined-basic"
                                    label="Enter Full Name"
                                    variant="outlined"
                                    value={userName}
                                    onChange={handleChangeUserName}
                                    sx={{
                                        width: '300px',
                                        marginBottom: '10px',
                                    }}
                                ></TextField>
                            </div>
                            <div>
                                <TextField
                                    id="outlined-basic"
                                    label="Enter Password *"
                                    variant="outlined"
                                    value={password}
                                    onChange={handleChangePassword}
                                    sx={{
                                        width: '300px',
                                        marginBottom: '10px',
                                    }}
                                ></TextField>
                            </div>
                            <div>
                                <TextField
                                    id="outlined-basic"
                                    label="Re Enter Your Password"
                                    variant="outlined"
                                    value={passwordConfirm}
                                    onChange={handleChangePasswordConfirm}
                                    sx={{
                                        width: '300px',
                                        marginBottom: '30px',
                                    }}
                                ></TextField>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={handleClick}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    </Container>
                </Container>
            </Box>
        </Container>
    )
}

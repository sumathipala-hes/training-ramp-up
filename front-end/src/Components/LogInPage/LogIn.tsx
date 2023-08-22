import { Box, Button, Container, TextField } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { enteredEmail, enteredPassword } from './LogInSlice'
import { useNavigate } from 'react-router-dom'
export default function LogIn() {
    const navigate = useNavigate()
    const dispacth = useDispatch()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleClick = () => {
        navigate('/student-table') // Navigate to the "/student-table" route
        dispacth(enteredEmail(email))
        dispacth(enteredPassword(password))
    }

    const handleClick2 = () => {
        navigate('/sign-up') // Navigate to the "/sign-up" route
    }

    const handleChangeEmail = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setEmail(event.target.value)
    }

    const handleChangePassword = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setPassword(event.target.value)
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
                    height: 350,
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
                        Log In
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
                                    label="Enter Password *"
                                    variant="outlined"
                                    value={password}
                                    onChange={handleChangePassword}
                                    sx={{
                                        width: '300px',
                                        marginBottom: '30px',
                                    }}
                                ></TextField>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    disabled={!email}
                                    endIcon={<ArrowForwardRoundedIcon />}
                                    onClick={handleClick}
                                >
                                    Continue
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleClick2}
                                    sx={{ marginLeft: '40px' }}
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

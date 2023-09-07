import { Box, Button, Container, TextField } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogInState, logInSuccessfulState, logInUser } from './LogInSlice'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
export default function LogIn() {
    const asyncLocalStorage = {
        async setItem(key: string, value: string) {
            await null
            return localStorage.setItem(key, value)
        },
        async getItem(key: string) {
            await null
            return localStorage.getItem(key)
        },
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const responseState = useSelector(
        (store: RootState) => store.logIn.successState
    )

    const response = useSelector((store: RootState) => store.logIn.successRole)

    if (response === 'USER') {
        localStorage.setItem('Role', 'USER')
    } else if (response === 'ADMIN') {
        localStorage.setItem('Role', 'ADMIN')
    }
    useEffect(() => {
        if (responseState) {
            checkRoleAndNavigate()
            dispatch(logInSuccessfulState(false))
        }
    }, [responseState])

    const checkRoleAndNavigate = async () => {
        const role = await asyncLocalStorage.getItem('Role')

        if (role === 'USER') {
            navigate('/student-table-plain')
            console.log('Now I will navigate to Uneditable Table')
        } else if (role === 'ADMIN') {
            navigate('/student-table')
            console.log('Now I will navigate to Editable Table')
        }
    }
    const handleClick = () => {
        const newUser: LogInState = {
            email: email,
            password: password,
        }
        dispatch(logInUser(newUser))
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
                                    type="password"
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

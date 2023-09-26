import { Box, Button, Container, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignUpState, signUpSuccessfulState, signUpUser } from './SignUpSlice'
import { RootState } from '../../store'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../App'

export default function SignUp() {
    const asyncLocalStorage = {
        async setItem(key: string, value: string) {
            await null
            return localStorage.setItem(key, value)
        },
        async getItem(key: string) {
            await null
            return localStorage.getItem(key)
        },
        async removeItem(key: string) {
            await null
            return localStorage.removeItem(key)
        },
    }
    const dispacth = useDispatch()
    const navigate = useNavigate()

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

    const responseState = useSelector(
        (store: RootState) => store.signUp.successState
    )

    const response = useSelector(
        (store: RootState) => store.signUp.successMessage
    )

    if (response === 'USER') {
        localStorage.setItem('Role', 'USER')
    } else if (response === 'ADMIN') {
        localStorage.setItem('Role', 'ADMIN')
    }
    useEffect(() => {
        console.log(responseState)
        if (responseState) {
            checkRoleAndNavigate()
            dispacth(signUpSuccessfulState(false))
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
        if (password === passwordConfirm) {
            const newUser: SignUpState = {
                email: email,
                userName: userName,
                password: password,
            }
            dispacth(signUpUser(newUser))
            socket.emit('signup', 'A new User is Created')
        } else {
            alert('Password and Confirm Password must be same')
        }
    }

    const handleClick2 = () => {
        navigate('/')
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
                                id="outlined-basic1"
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
                                    id="outlined-basic2"
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
                                    id="outlined-basic3"
                                    label="Enter Password *"
                                    type="password"
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
                                    id="outlined-basic4"
                                    label="Re Enter Your Password"
                                    type="password"
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
                                <Button
                                    variant="contained"
                                    onClick={handleClick2}
                                    sx={{ marginLeft: '40px' }}
                                >
                                    Log In
                                </Button>
                            </div>
                        </form>
                    </Container>
                </Container>
            </Box>
        </Container>
    )
}

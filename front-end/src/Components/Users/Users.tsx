/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import {
    Container,
    ListItemButton,
    ListItemText,
    TextField,
} from '@mui/material'
import { UserState, changeUserRole, deleteUser } from './UsersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { User, fetchUsers } from './UsersListSlice'
import { useNavigate } from 'react-router-dom'
import { logInSuccessfull, logOutInvoke } from '../LogInPage/LogInSlice'
import { NewUserState, createUser } from './NewUserSlice'
import { socket } from '../../App'

export default function Users() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [role, setRole] = React.useState('User')
    const [id, setId] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [isOpen3, setIsOpen3] = useState(false)

    let users: User[] = []
    const authState = useSelector((state: RootState) => state.logIn.authState)
    const userRole = useSelector((state: RootState) => state.logIn.successRole)

    if (authState && userRole === 'ADMIN') {
        useEffect(() => {
            dispatch(fetchUsers())
        }, [dispatch])
        users = useSelector((state: RootState) => state.usersList.usersList)
    }

    const handleChangeRole = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setRole(event.target.value)
    }

    const handleChangeId = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setId(event.target.value)
    }
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

    const handleChangeRoleClick = () => {
        const user: UserState = {
            userId: parseInt(id),
            roles: [role.toUpperCase()],
        }
        dispatch(changeUserRole(user))
    }

    const handleCreateUserClick = () => {
        const user: NewUserState = {
            email: email,
            userName: userName,
            password: password,
        }
        console.log(user)
        dispatch(createUser(user))
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(parseInt(id)))
        socket.emit('deleteUser', `User with ${id} is Removed`)
    }

    const handleLogOut = async () => {
        localStorage.clear()
        dispatch(logOutInvoke())
        dispatch(logInSuccessfull('fail'))
        navigate('/')
    }

    const handleToStudentsTable = async () => {
        navigate('/student-table')
    }
    const buttonStyle = {
        fontSize: '20px',
        color: 'violet',
        cursor: 'pointer',
        border: '3px solid transparent',
        outlineStyle: 'hidden',
    }

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
            <Container sx={{ backgroundColor: 'cyan', borderRadius: '20px' }}>
                <ul>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemText primary="ID"></ListItemText>
                        <ListItemText primary="Email"></ListItemText>
                        <ListItemText
                            primary="Role"
                            sx={{ marginLeft: '180px' }}
                        ></ListItemText>
                    </ListItemButton>
                    {users.map((userItem: User) => (
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemText>{userItem.id}</ListItemText>
                            <ListItemText>{userItem.email}</ListItemText>
                            <ListItemText>{userItem.roles}</ListItemText>
                        </ListItemButton>
                    ))}
                </ul>
            </Container>
            <>
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen3((open) => !open)}
                    style={buttonStyle}
                >
                    {isOpen3 ? '–' : '+ Register User'}
                </button>
                {isOpen3 && (
                    <Container
                        sx={{
                            marginTop: '80px',
                            marginBottom: '50px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <TextField label="email" onChange={handleChangeEmail}>
                            Email
                        </TextField>
                        <TextField
                            label="username"
                            onChange={handleChangeUserName}
                        >
                            Username
                        </TextField>
                        <TextField
                            label="password"
                            onChange={handleChangePassword}
                        >
                            Password
                        </TextField>

                        <Button onClick={handleCreateUserClick}>
                            Create User
                        </Button>
                    </Container>
                )}
            </>

            <>
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen2((open) => !open)}
                    style={buttonStyle}
                >
                    {isOpen2 ? '–' : '+ Change User Role'}
                </button>
                {isOpen2 && (
                    <Container
                        sx={{
                            marginLeft: '180px',
                        }}
                    >
                        <TextField label="id" onChange={handleChangeId}>
                            ID
                        </TextField>
                        <select
                            value={role}
                            onChange={handleChangeRole}
                            style={{
                                fontSize: '20px',
                                color: 'grey',
                                display: 'inline-block',
                                width: '150px',
                                height: '55px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                border: '3px solid transparent',
                                outlineStyle: 'hidden',
                                marginLeft: '10px',
                            }}
                        >
                            <option>User</option>
                            <option>Admin</option>
                        </select>
                        <Button onClick={handleChangeRoleClick}>
                            {' '}
                            Change Role to
                        </Button>
                    </Container>
                )}
            </>
            <>
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen1((open) => !open)}
                    style={buttonStyle}
                >
                    {isOpen1 ? '–' : '+ Delete User'}
                </button>
                {isOpen1 && (
                    <Container
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        <TextField label="id" onChange={handleChangeId}>
                            ID
                        </TextField>
                        <Button onClick={handleDeleteUser}>Delete User</Button>
                    </Container>
                )}
            </>

            <Container sx={{ marginTop: '50px' }}>
                <Button
                    variant="outlined"
                    onClick={handleLogOut}
                    sx={{
                        marginLeft: '300px',
                        marginRight: '50px',
                    }}
                >
                    Log Out
                </Button>
                <Button
                    variant="contained"
                    onClick={handleToStudentsTable}
                    sx={{ marginLeft: '80px' }}
                >
                    Students Table
                </Button>
            </Container>
        </Container>
    )
}

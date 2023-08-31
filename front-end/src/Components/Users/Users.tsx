/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'
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
import { logInSuccessfull } from '../LogInPage/LogInSlice'

export default function Users() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [role, setRole] = React.useState('')
    const [id, setId] = React.useState('')

    const users = useSelector((state: RootState) => state.usersList.usersList)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

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

    const handleChangeRoleClick = () => {
        const user: UserState = {
            userId: parseInt(id),
            userRole: [role.toUpperCase()],
        }
        dispatch(changeUserRole(user))
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(parseInt(id)))
    }

    const handleLogOut = async () => {
        localStorage.clear()
        dispatch(logInSuccessfull('fail'))
        navigate('/')
    }

    const handleToStudentsTable = async () => {
        navigate('/student-table')
    }

    return (
        <Container>
            <Container>
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
            <Container
                sx={{
                    marginTop: '100px',
                    marginLeft: '180px',
                    marginBottom: '20px',
                }}
            >
                <TextField label="id" onChange={handleChangeId}>
                    ID
                </TextField>
                <Button onClick={handleDeleteUser}>Delete User</Button>
            </Container>
            <Container
                sx={{
                    marginLeft: '180px',
                }}
            >
                <TextField label="id" onChange={handleChangeId}>
                    ID
                </TextField>
                <TextField label="ADMIN/USER" onChange={handleChangeRole}>
                    Role
                </TextField>
                <Button onClick={handleChangeRoleClick}> Change Role to</Button>
            </Container>
            <Container>
                <Button
                    variant="outlined"
                    onClick={handleLogOut}
                    sx={{
                        marginLeft: '180px',
                        marginRight: '50px',
                        marginTop: '80px',
                        marginBottom: '100px',
                    }}
                >
                    Log Out
                </Button>
                <Button
                    variant="contained"
                    onClick={handleToStudentsTable}
                    sx={{ marginTop: '80px', marginBottom: '100px' }}
                >
                    Students Table
                </Button>
            </Container>
        </Container>
    )
}

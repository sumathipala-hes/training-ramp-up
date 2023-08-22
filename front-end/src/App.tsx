import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.css'
import { Container } from '@mui/material'
// import GridTable from './Components/GridTable/GridTable'
import * as io from 'socket.io-client'
import { fetchRows } from './Components/GridTable/GridSlice'
import AppRouter from './Router/AppRouter'
export const socket = io.connect('http://localhost:5000')

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        // Dispatch the action to fetch rows when the component mounts
        dispatch(fetchRows())
    }, [dispatch])

    useEffect(() => {
        socket.on('recievedNewStudent', () => {
            alert('New Student Added')
            dispatch(fetchRows())
        })
        socket.on('recievedUpdateStudent', (data) => {
            alert(data)
            dispatch(fetchRows())
        })
        socket.on('recievedDeleteStudent', (data) => {
            alert(data)
            dispatch(fetchRows())
        })
    }, [socket])

    return (
        <Container maxWidth={false}>
            <AppRouter />
        </Container>
    )
}

export default App

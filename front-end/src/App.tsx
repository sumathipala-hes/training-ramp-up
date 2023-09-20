import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'

import './App.css'
import { Container } from '@mui/material'
// import GridTable from './Components/GridTable/GridTable'
import * as io from 'socket.io-client'
// import { fetchRows } from './Components/GridTable/GridSlice'
import AppRouter from './Router/AppRouter'
export const socket = io.connect('http://localhost:4000')

function App() {
    // const dispatch = useDispatch()
    socket.emit('message', 'Application is Started and Socket is connected')
    useEffect(() => {
        socket.on('message', () => {
            console.log('Socket Connected')
        })

        socket.on('signup', (data) => {
            alert(data)
        })

        socket.on('deleteUser', (data) => {
            alert(data)
        })

        socket.on('wrongDetails', (data) => {
            alert(data)
        })

        socket.on('newStudent', (data) => {
            alert(data)
        })

        socket.on('deleteStudent', (data) => {
            alert(data)
        })

        socket.on('userNotFound', (data) => {
            alert(data)
        })

        // socket.on('recievedDeleteStudent', (data) => {
        //     alert(data)
        //     dispatch(fetchRows())
        // })
    }, [socket])

    return (
        <Container maxWidth={false}>
            <AppRouter />
        </Container>
    )
}

export default App

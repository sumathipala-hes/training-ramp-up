import React, { useEffect } from 'react'
import './App.css'
import * as io from 'socket.io-client'
import AppRouter from './Router/AppRouter'
export const socket = io.connect('http://localhost:4000')

function App() {
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
    }, [socket])

    return <AppRouter />
}

export default App

import React from 'react'
import './App.css'
import { Container } from '@mui/material'
import GridTable from './Components/GridTable/GridTable'

function App() {
    return (
        <Container maxWidth={false}>
            <GridTable />
        </Container>
    )
}

export default App

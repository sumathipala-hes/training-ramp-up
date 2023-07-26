import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import './App.css'
import { Container } from '@mui/material'
import GridTable from './Components/GridTable/GridTable'

function App() {
    return (
        <Provider store={store}>
            <Container maxWidth={false}>
                <GridTable />
            </Container>
        </Provider>
    )
}

export default App

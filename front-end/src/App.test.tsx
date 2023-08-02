import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import FullFeaturedCrudGrid from './Components/GridTable/GridTable'

test('Check initial status of add new button', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )

    const addButton = screen.getByRole('button', { name: 'Add record' })

    expect(addButton).toBeEnabled()
})

test('Check presence of rows on initial render', () => {
    render(
        <Provider store={store}>
            <FullFeaturedCrudGrid />
        </Provider>
    )

    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(1) // Assuming the initial state has 5 rows.
})

test('Check if "Add record" button adds a new row', () => {
    render(
        <Provider store={store}>
            <FullFeaturedCrudGrid />
        </Provider>
    )

    const addButton = screen.getByRole('button', { name: 'Add record' })
    fireEvent.click(addButton)

    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(2) // Assuming the initial state has 5 rows.
})

// test('Check if row enters edit mode when the "Edit" button is clicked', () => {
//     render(
//         <Provider store={store}>
//             <FullFeaturedCrudGrid />
//         </Provider>
//     )

//     const editButton = screen.getAllByText('Edit')[0]
//     fireEvent.click(editButton)

//     const nameCell = screen.getAllByRole('cell', { name: 'Name' })[1]
//     const nameInput = nameCell.querySelector('input')

//     fireEvent.change(nameInput, { target: { value: 'Adam' } })

//     expect(nameInput.value).toBe('Adam')
// })

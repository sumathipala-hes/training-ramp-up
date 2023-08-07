import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from '../../App'
import { Provider } from 'react-redux'
import { store } from '../../store'
import FullFeaturedCrudGrid from '../GridTable/GridTable'

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
    expect(rows.length).toBe(1)
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

test('renders with initial rows', () => {
    render(
        <Provider store={store}>
            <FullFeaturedCrudGrid />
        </Provider>
    )

    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(2)
})

test('adds a new row with valid data', () => {
    render(
        <Provider store={store}>
            <FullFeaturedCrudGrid />
        </Provider>
    )

    const addButton = screen.getByRole('button', { name: 'Add record' })
    fireEvent.click(addButton)

    // Find and interact with the text input fields
    const nameInput = screen.getAllByRole('textbox')[0] // Assuming there's only one textbox for the 'Name' field
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    const mobileNumberInput = screen.getAllByRole('textbox')[1]
    fireEvent.change(mobileNumberInput, { target: { value: '1234567890' } })

    const addressInput = screen.getAllByRole('textbox')[2]
    fireEvent.change(addressInput, { target: { value: '123 Main St' } })

    const saveButton = screen.getByRole('menuitem', { name: 'Save' })
    fireEvent.click(saveButton)

    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(3)
})

test('edits a row with valid data', async () => {
    render(
        <Provider store={store}>
            <FullFeaturedCrudGrid />
        </Provider>
    )

    // Find the edit button for the first row
    const firstRowEditButton = screen.getAllByRole('menuitem', {
        name: 'EditRow',
    })[0]
    fireEvent.click(firstRowEditButton)

    // Find and interact with the text input field for the 'Name' field
    const nameInput = screen.getAllByRole('textbox')[0]
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } })

    // Find and interact with the save button
    const saveButton = screen.getByRole('menuitem', { name: 'Save' })
    fireEvent.click(saveButton)

    // Wait for the row to be updated
    await waitFor(() => {
        const updatedRow = screen.getByText('Jane Smith')
        expect(updatedRow).toBeInTheDocument()
    })
})

test('cancels row edit', async () => {
    render(
        <Provider store={store}>
            <FullFeaturedCrudGrid />
        </Provider>
    )

    // Find the edit button for the first row
    const firstRowEditButton = screen.getAllByRole('menuitem', {
        name: 'EditRow',
    })[0]
    fireEvent.click(firstRowEditButton)

    // Find and interact with the cancel button
    const cancelButton = screen.getByRole('menuitem', { name: 'Cancel' })
    fireEvent.click(cancelButton)

    // Wait for the edit mode to be exited
    await waitFor(() => {
        const nameCell = screen.getByText('Jane Smith')
        expect(nameCell).toBeInTheDocument()
    })
})

test('deletes a row', async () => {
    render(
        <Provider store={store}>
            <FullFeaturedCrudGrid />
        </Provider>
    )

    // Find the delete button for the first row
    const firstRowDeleteButton = screen.getAllByRole('menuitem', {
        name: 'Delete',
    })[0]
    fireEvent.click(firstRowDeleteButton)

    // Wait for the row to be removed
    await waitFor(() => {
        const rows = screen.queryAllByRole('row')
        expect(rows.length).toBe(2) // Assuming the initial state has 2 rows and one is deleted.
    })
})

test('handleRowEditStop deletes row if fields are not filled properly', async () => {
    render(
        <Provider store={store}>
            <FullFeaturedCrudGrid />
        </Provider>
    )

    // Assume we have an "Add record" button
    const addButton = screen.getByRole('button', { name: 'Add record' })
    fireEvent.click(addButton)

    // Assume we have a save button for the new row
    const saveButton = screen.getByRole('menuitem', { name: 'Save' })
    fireEvent.click(saveButton)

    // Check if the row is deleted from the Redux store
    const rowsAfterDelete = store.getState().grid.rows
    expect(rowsAfterDelete).toHaveLength(2)
})
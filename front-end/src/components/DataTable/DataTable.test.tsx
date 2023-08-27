import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DataTable } from './DataTable';
import dataReducer from '../../redux/slice';
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  data: {
    records: [
      {
        id: 1,
        name: 'Luke',
        age: 25,
        gender: 'Male',
        address: 'Main Street',
        mobile: '1234567890',
        dob: '1998-01-01',
        isNew: false,
      },
    ],
    rowModesModel: {
      1: { mode: 'View' },
    },
    studentId: 0,
    studentData: {
      id: 0,
      name: '',
      gender: '',
      address: '',
      mobile: '',
      dob: '',
      age: 0,
    },
  },
};

const store = configureStore({
  reducer: { data: dataReducer },
  preloadedState: initialState,
});

describe('DataTable Component', () => {
  it('renders the EditToolbar with the "Add New" button and its functionality', async () => {
    render(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );

    const initialRows = store.getState().data.records;
    const initialRowsCount = initialRows.length;

    const addNewButton = screen.getByRole('button', { name: 'Add New' });
    fireEvent.click(addNewButton);

    const updatedRows = store.getState().data.records;
    const updatedRowsCount = updatedRows.length;

    expect(updatedRowsCount).toBe(initialRowsCount + 1);
  });

  it('"Cancel" button and its functionality', async () => {
    render(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );

    const rowToEdit = screen.getByRole('row', { name: /Luke/i });
    expect(rowToEdit).toBeInTheDocument();

    const editButton = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButton[0]);

    const cancelButton = screen.getAllByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton[0]);
  });

  it('"Save" button and its functionality: shows the changes after saving the row', async () => {
    render(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );

    const rowToEdit = screen.getByRole('row', { name: /Luke/i });
    expect(rowToEdit).toBeInTheDocument();

    const newAddress = screen.getAllByRole('textbox')[0];
    fireEvent.change(newAddress, { target: { value: 'Newport' } });

    const saveButton = screen.getAllByRole('button', { name: /save/i });
    expect(saveButton[0]).toBeInTheDocument();
    fireEvent.click(saveButton[0]);

    await waitFor(() => {
      const updatedRow = screen.getByText('Newport');
      expect(updatedRow).toBeInTheDocument();
    });
  });

  it('displays snackbar messages for invalid inputs', async () => {
    render(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );
    fireEvent.click(screen.getByText('Add New'));
    fireEvent.click(screen.getByText('Save'));
    await screen.findByText('Please fill name');
  });
});

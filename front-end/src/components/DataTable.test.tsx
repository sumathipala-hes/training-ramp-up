import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { DataTable } from './DataTable';
import { initialRows } from '../utils/InitialRows';

test('display the initial rows correctly', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>,
  );

  expect(screen.getByText('Ted')).toBeInTheDocument();
  expect(screen.getByText('Rachel')).toBeInTheDocument();
  expect(screen.getByText('Justin')).toBeInTheDocument();
  expect(screen.getByText('Emma')).toBeInTheDocument();
});

test('render the "Delete" button and its functionality', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>,
  );

  const rowToDelete = screen.getByRole('row', { name: /Ted/i });
  expect(rowToDelete).toBeInTheDocument();
  const deleteButton = screen.getAllByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton[0]);
  expect(rowToDelete).not.toBeInTheDocument();
});

test('render the "Edit" button and its functionality', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>,
  );

  //find edit button and trigger a click on it
  const rowToEdit = screen.getByRole('row', { name: /Ted/i });
  expect(rowToEdit).toBeInTheDocument();

  const editButton = screen.getAllByRole('button', { name: /edit/i });
  fireEvent.click(editButton[0]);

  const initialRows = store.getState().data.records;
  const rowToFind = 'Ted'; 
  const matchingRow = initialRows.find((row: any) => row.name === rowToFind);

  // if (matchingRow) {
  //   const rowId = matchingRow.id;
  // }
  //   const updatedState = store.getState();
  //   expect(updatedState.data.rowModesModel[rowId].mode).toBe('Edit');
});

test('render the "Save" button and its functionality', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>,
  );

  const rowToEdit = screen.getByRole('row', { name: /Rachel/i });
  expect(rowToEdit).toBeInTheDocument();
  const editButton = screen.getAllByRole('button', { name: /edit/i });
  fireEvent.click(editButton[0]);

  const nameCell = screen.getByRole('cell', { name: /rachel/i });
  // fireEvent.doubleClick(nameCell);
  // const inputElement = screen.getAllByText('rachel');
  // fireEvent.change(inputElement, { target: { value: 'New Name' } });

  //  fireEvent.change(nameCell, { target: { value: 'New Name' } });

  // if (document.activeElement) {
  //   fireEvent.click(document.activeElement);
  //   fireEvent.change(document.activeElement, { target: { value: 'Update name' } });
  //   fireEvent.blur(document.activeElement);
  // }

  // fireEvent.change(nameInput, { target: { value: 'Updated Name' } });

  const saveButton = screen.getAllByRole('button', { name: /save/i });
  fireEvent.click(saveButton[0]);

  // expect(screen.getByText(/Updated Name/i)).toBeInTheDocument();
  // const updatedRowModesModel = store.getState().data.rowModesModel;
  // expect(updatedRowModesModel[1].mode).toBe('View');
});

test('render the "Cancel" button and its functionality', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>,
  );

  const rowToEdit = screen.getByRole('row', { name: /Rachel/i });
  expect(rowToEdit).toBeInTheDocument();

  const editButton = screen.getAllByRole('button', { name: /edit/i });
  fireEvent.click(editButton[0]);

  const cancelButton = screen.getAllByRole('button', { name: /cancel/i });
  fireEvent.click(cancelButton[0]);
});

test('renders the EditToolbar with the "Add New" button and its functionality', () => {
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

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { DataTable } from './DataTable';



test('display the initial rows correctly', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>
  );

  expect(screen.getByText('Ted')).toBeInTheDocument();
  expect(screen.getByText('Rachel')).toBeInTheDocument();
  expect(screen.getByText('Justin')).toBeInTheDocument();
  expect(screen.getByText('Emma')).toBeInTheDocument();

});

test('render the delete button', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>
  );

  const rowToDelete = screen.getByRole('row', {name: /Ted/i});
  expect(rowToDelete).toBeInTheDocument();
  const deleteButton = screen.getAllByRole('button', {name: /delete/i});
  fireEvent.click(deleteButton[0]);
  expect(rowToDelete).not.toBeInTheDocument();
})

test('render the edit button', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>
  );

  const rowToEdit = screen.getByRole('row', { name: /Emma/i });
  expect(rowToEdit).toBeInTheDocument();

  const editButton = screen.getAllByRole('button', { name: /edit/i });
  fireEvent.click(editButton[0]);

  // const rowId = rowToEdit.getAttribute('data-testid');

  // // //check if the row is in edit mode 
  // const updatedState = store.getState();
  // expect(updatedState.data.rowModesModel[rowId].mode).toBe('Edit');
  
})

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



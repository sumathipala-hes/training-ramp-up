import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DataTable } from './DataTable';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { DataGrid } from '@mui/x-data-grid';
import configureMockStore from 'redux-mock-store';

test('renders DataTable component without error', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>,
  );
});

  test('displays initial rows correctly', () => {
    render(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );

    const tedRow = screen.getByText('Ted')
    const rachelRow = screen.getByText('Rachel');
    const justinRow = screen.getByText('Justin');

    expect(tedRow).toBeInTheDocument();
    expect(rachelRow).toBeInTheDocument();
    expect(justinRow).toBeInTheDocument();

  });

// test('delete button', () => {
//   render(
//     <Provider store={store}>
//       <DataGrid columns={[]} rows={[]} />
//     </Provider>
//   );

//   const toDelete = screen.getByRole('row', {name: /Ted/i })
//   expect(toDelete).toBeInTheDocument();

//   const deleteBtn = screen.getByRole('button', { name: 'Delete' });
//   fireEvent.click(deleteBtn);
  
//   // const deleteButton = screen.getByRole('button', { name: /delete/i });
//   // fireEvent.click(deleteButton);
//     // expect(tedRow).not.toBeInTheDocument();
// })


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



import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable } from './DataTable';
import { Provider } from 'react-redux';
import store from '../redux/store';

test('renders DataTable component without error', () => {
  render(
    <Provider store={store}>
      <DataTable />
    </Provider>,
  );
});

test('renders the EditToolbar with the "Add New" button and its functionality', () => {
    render(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );

    const addNewButton = screen.getByRole('button', { name: 'Add New' });
    expect(addNewButton).toBeInTheDocument();
    // fireEvent.click(addNewButton);
    // const newRow = screen.getAllByText('')
    // expect(newRow).toBeInTheDocument();
  });


//   test('displays initial rows correctly', () => {
//     render(
//       <Provider store={store}>
//         <DataTable />
//       </Provider>,
//     );

//     const tedRow = screen.getByText('Ted')
//     const rachelRow = screen.getByText('Rachel');
//     const justinRow = screen.getByText('Justin');
//     const harvinRow = screen.getByText('Harvin');

  
//     expect(tedRow).toBeInTheDocument();
//     expect(rachelRow).toBeInTheDocument();
//     expect(justinRow).toBeInTheDocument();
//     expect(harvinRow).toBeInTheDocument();
//   });

  
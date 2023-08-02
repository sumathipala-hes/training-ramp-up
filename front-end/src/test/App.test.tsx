import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../redux/store';

test('Check initial status of add new button', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const addButton = screen.getByRole('button', { name:  "Add new"  });

  expect(addButton).toBeEnabled();
});

test('Check the clicked status of add new button', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const addButton = screen.getByRole('button', { name: "Add new" });

  fireEvent.click(addButton);

  expect(addButton).toBeDisabled();

  const discardButton = screen.getByRole('button', { name: "Discard Changes" });

  fireEvent.click(discardButton);

  expect(addButton).toBeEnabled();
});


test('Edit row', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const fistRow = screen.getByRole('row', {name:"1 John male Jon 0715426257 32 15-08-1990"})
  expect(fistRow).toBeInTheDocument();
  const editButton = screen.getAllByRole('button', { name: "Edit" });

  fireEvent.click(editButton[0]);
  const nameCell = screen.getAllByRole('textbox', {name:""});
  fireEvent.change(nameCell[0], { target: { value: 'Adam' } });

  const updateButton = screen.getByRole('button', { name: "Update"});
  fireEvent.click(updateButton);

  const updatedRow = screen.getByRole('row', {name:"1 Adam male Jon 0715426257 32"})
  expect(updatedRow ).toBeInTheDocument();
});

test('remove row', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const selectedRow = screen.getByRole('row', {name:"1 John male Jon 0715426257 32 15-08-1990"})
  expect(selectedRow).toBeInTheDocument();
  const removeButton = screen.getAllByRole('button', { name: /remove/i });

  // Simulate a click event on the "Add new" button
  fireEvent.click(removeButton[0]);

  expect(selectedRow).not.toBeInTheDocument();
});

// test('add new row', () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )
//   const addButton = screen.getByRole('button', { name: /add new/i });

//   fireEvent.click(addButton);

//   expect(addButton).toBeDisabled();

//   const cells = screen.getAllByRole('textbox', { name: "" });
//   fireEvent.change(cells[0], { target: { value: 'Adam' } });
//   fireEvent.change(cells[1], { target: { value: 'gampaha' } });
//   fireEvent.change(cells[2], { target: { value: '0714585687' } });
//   const addRowButton = screen.getByRole("button", { name: "Add" });
//   fireEvent.click(addRowButton);

//   const selectedRow = screen.getByRole('row', {name:"10 Adam male gampaha 0714585687"})
//   expect(selectedRow).toBeInTheDocument();
// });

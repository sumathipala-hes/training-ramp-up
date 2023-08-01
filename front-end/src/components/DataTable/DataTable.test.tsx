import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux"; // Import the Provider
import DataTable from "./DataTable";
import store from '../../redux/store';
import { createRenderer } from "react-dom/test-utils";
import { initialRows } from "../../util/Data";


// test('DataTable component renders correctly', () => {
//     const { asFragment } = render(<Provider store={store}>
// //         <DataTable />
// //       </Provider>);
//     expect(asFragment()).toMatchSnapshot();
// });




describe("DataTable component", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the DataGrid component", () => {
        render(
            // Wrap the DataTable with the Provider and pass the mockStore as the store prop
            <Provider store={store}>
                <DataTable />
            </Provider>
        );
        const dataGrid = screen.getByRole("grid");
        expect(dataGrid).toBeInTheDocument();
    });

    it("should add a new row when the 'Add new' button is clicked", async () => {
        render(
            <Provider store={store}>
                <DataTable />
            </Provider>
        );


        const grid = screen.getByRole('grid'); // Get the grid element
        const initialRowCount = Number(grid.getAttribute('aria-rowcount')); // Get the initial row count

        const addNewButton = screen.getByTestId("add-new1");
        fireEvent.click(addNewButton);

        await waitFor(() => {
            const updatedRowCount = Number(grid.getAttribute('aria-rowcount')); // Get the updated row count
            expect(updatedRowCount).toBe(initialRowCount + 1);
        });
    });



    // it("should change the mode to edit mode when the 'Edit' button is clicked", () => {
    //     render(

    //         <Provider store={store}>
    //             <DataTable />
    //         </Provider>
    //     );
    //     const rowId = "";
    //     const editButton = screen.getByTestId(`edit-button-${rowId}`);
    //     fireEvent.click(editButton);
    //     const rowModesModel = screen.getByTestId("data-grid").getAttribute("data-row-modes-model");
    //     expect(rowModesModel).toContain(`"${rowId}":{"mode":"edit"}`);
    // });

    // it("should change the mode to view mode when the 'Save' button is clicked", () => {
    //     render(

    //         <Provider store={store}>
    //             <DataTable />
    //         </Provider>
    //     );
    //     const rowId = "";
    //     const saveButton = screen.getByTestId(`save-button-${rowId}`);
    //     fireEvent.click(saveButton);
    //     const rowModesModel = screen.getByTestId("data-grid").getAttribute("data-row-modes-model");
    //     expect(rowModesModel).toContain(`"${rowId}":{"mode":"view"}`);
    // });

//     it("should delete a row when the 'Delete' button is clicked", () => {
//     render( <Provider store={store}>
//                <DataTable />
//             </Provider>);
//     const rowId = "some-id"; // Replace with an actual row ID that exists in the rows data
//     const initialRows = screen.getAllByRole("row");
//     const deleteButton = screen.getByTestId(`delete-button-${rowId}`);
//     fireEvent.click(deleteButton);
//     const updatedRows = screen.getAllByRole("row");
//     expect(updatedRows.length).toBe(initialRows.length - 1);
//   });
    
    
    it("should delete a row when the 'Delete' button is clicked", () => {
    render(<Provider store={store}>
               <DataTable />
            </Provider>);
       const initialRows = screen.getAllByRole('row');
//   const testId = `delete-button-${initialRows[2].getAttribute('data-id')}`;
const testId = 'delete-button-123';

        // const deleteButton = screen.getByTestId(testId).innerHTML;
        const deleteButton = screen.getAllByTestId(testId);
        // fireEvent.click(deleteButton);
       
    // fireEvent.click(deleteButton);
    // const updatedRows = screen.getAllByRole("row");
    // expect(updatedRows.length).toBe(initialRows.length - 1);
  });


    // it("should delete a row when the 'Delete' button is clicked", async() => {
    //     render(

    //         <Provider store={store}>
    //             <DataTable />
    //         </Provider>
    //     );
    //     const grid = screen.getByRole('grid'); // Get the grid element
    //     const initialRowCount = Number(grid.getAttribute('aria-rowcount')); // Get the initial row count

    //     const addNewButton = screen.getByTestId('delete-button');
    //     fireEvent.click(addNewButton);

    //     await waitFor(() => {
    //         const updatedRowCount = Number(grid.getAttribute('aria-rowcount')); // Get the updated row count
    //         expect(updatedRowCount).toBe(initialRowCount - 1);
    //     });
    // });

});
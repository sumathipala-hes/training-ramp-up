import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux"; // Import the Provider
import DataTable from "./DataTable";
import store from '../../redux/store';



describe("DataTable component", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should render the DataGrid component", () => {
        render(
            // Wrap the DataTable with the Provider and pass the mockStore as the store prop
            <Provider store={store}>
                <DataTable />
            </Provider>
        );
        const dataGrid = screen.getByRole("grid");
        expect(dataGrid).toBeInTheDocument();
    });


    //add new button test case
    test("should add a new row when the 'Add new' button is clicked", async () => {
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





    // delete button test case
    // test("should delete a row when the 'Delete' button is clicked", () => {
    //     render(<Provider store={store}>
    //         <DataTable />
    //     </Provider>
    //     );
    //     const initialRows = screen.getAllByRole('row');
    //     const testId = `delete-button-${initialRows[2].getAttribute('data-id')}`;
    //     // const testId = 'delete-button-123';
    //     const deleteButton = screen.getByTestId(testId);

    //     fireEvent.click(deleteButton);


    // const updatedRows = screen.getAllByRole("row");
    // expect(updatedRows.length).toBe(initialRows.length - 1);
    // });


    //edit button test case
    // test("should change the mode to edit mode when the 'Edit' button is clicked", () => {
    //     render(

    //         <Provider store={store}>
    //             <DataTable />
    //         </Provider>
    //     );
    //     const initialRows = screen.getAllByRole('row');
    //     const testId = `edit-button-${initialRows[2].getAttribute('data-id')}`;

    //     const editButton = screen.getByTestId(testId);
    //     fireEvent.click(editButton);
    //     const rowModesModel = screen.getByTestId("data-grid").getAttribute("data-row-modes-model");
    //     expect(rowModesModel).toContain(`"${initialRows[2].getAttribute('data-id')}":{"mode":"edit"}`);
    // });



});
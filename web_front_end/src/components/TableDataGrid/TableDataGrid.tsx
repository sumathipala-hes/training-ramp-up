import React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./TableDataGrid.css";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        headerClassName: "headerCellStyles",
    },
    {
        field: "name",
        headerName: "Name",
        type: "string",
        editable: true,
        headerAlign: "center",
        align: "center",
        headerClassName: "headerCellStyles",
    },
    {
        field: "gender",
        headerName: "Gender",
        editable: true,
        headerAlign: "center",
        align: "center",
        headerClassName: "headerCellStyles",
        type: "singleSelect",
        valueOptions: ["Male", "Female"],
    },
    {
        field: "address",
        headerName: "Address",
        type: "string",
        editable: true,
        headerAlign: "center",
        align: "center",
        headerClassName: "headerCellStyles",
    },
    {
        field: "mobile",
        headerName: "Mobile No",
        type: "string",
        editable: true,
        headerAlign: "center",
        align: "center",
        headerClassName: "headerCellStyles",
    },
    {
        field: "birthday",
        headerName: "Date of Birth",
        type: "date",
        editable: true,
        headerAlign: "center",
        align: "center",
        headerClassName: "headerCellStyles",
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        editable: true,
        headerAlign: "center",
        align: "center",
        headerClassName: "headerCellStyles",
    },
    {
        field: "actions",
        headerName: "Actions",
        headerAlign: "center",
        align: "center",
        width: 180,
        headerClassName: "headerCellStyles",
        renderCell: () => (
            <React.Fragment>
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        marginRight: "10px",
                        borderRadius: "8px",
                        backgroundColor: "#0984e3",
                    }}
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    color="error"
                    variant="contained"
                    sx={{ borderRadius: "8px", backgroundColor: "#e74c3c" }}
                >
                    Remove
                </Button>
            </React.Fragment>
        ),
    },
];

const rows = [
    {
        name: "Maneesha",
        gender: "Male",
        address: "Dehiwala",
        mobile: 717133589,
        birthday: new Date("2023-10-10"),
        age: 23,
    },
    {
        name: "Nimesh",
        gender: "Male",
        address: "Galle",
        mobile: 758595682,
        birthday: new Date("2023-09-25"),
        age: 21,
    },
    {
        name: "Pahasara",
        gender: "Male",
        address: "Panadura",
        mobile: 785749674,
        birthday: new Date("2023-09-30"),
        age: 22,
    },
    {
        name: "Nipunai",
        gender: "Female",
        address: "Galle",
        mobile: 725896478,
        birthday: new Date("2023-08-22"),
        age: 25,
    },
    {
        name: "Sadun",
        gender: "Male",
        address: "Colombo",
        mobile: 752875964,
        birthday: new Date("2023-05-07"),
        age: 28,
    },
    {
        name: "Sahani",
        gender: "Female",
        address: "Matara",
        mobile: 778596478,
        birthday: new Date("2023-10-08"),
        age: 29,
    },
];

const generateAutoIds = (
    rows: {
        name: string;
        gender: string;
        address: string;
        mobile: number;
        birthday: Date;
        age: number;
    }[],
) => {
    return rows.map((row, index) => ({ ...row, id: index + 1 }));
};

function TableDataGrid() {
    return (
        <Box
            maxWidth="xl"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
            }}
        >
            <DataGrid
                sx={{
                    maxWidth: 900,
                    backgroundColor: "#ecf0f1",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    marginLeft: "60px",
                    marginRight: "60px",
                }}
                autoHeight
                rows={generateAutoIds(rows)}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
            />
        </Box>
    );
}
export default TableDataGrid;

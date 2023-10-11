import React from "react";
import "./TableDataGrid.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowModes,
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridRowModesModel,
} from "@mui/x-data-grid";
import { useState } from "react";

function TableDataGrid() {
    const [rowModesModel] = useState<GridRowModesModel>({});

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 50,
            headerClassName: "headerCellStyles",
        },
        {
            field: "name",
            headerName: "Name",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
        },
        {
            field: "gender",
            headerName: "Gender",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            type: "singleSelect",
            valueOptions: ["Male", "Female"],
        },
        {
            field: "address",
            headerName: "Address",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
        },
        {
            field: "mobile",
            headerName: "Mobile No",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
        },
        {
            field: "birthday",
            headerName: "Date of Birth",
            type: "date",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Command",
            width: 200,
            cellClassName: "actions",
            headerClassName: "headerCellStyles",
            getActions: (row) => {
                const id = row.id;
                const isInEdit = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEdit) {
                    return [
                        <GridActionsCellItem
                            key={id}
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            className="grid-actions-cell-item"
                        />,
                        <GridActionsCellItem
                            key={id}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="grid-actions-cell-items-cancle"
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={id}
                        icon={<EditIcon />}
                        label="Edit"
                        className="grid-actions-cell-items-edit"
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={id}
                        icon={<DeleteIcon />}
                        label="Delete"
                        className="grid-actions-cell-items-cancle"
                        color="inherit"
                    />,
                ];
            },
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

    return (
        <Box
            sx={{
                backgroundColor: "#ecf0f1",
                padding: "10px",
                borderRadius: "18px",
            }}
        >
            <Button
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    mb: 2,
                    marginRight: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#0984e3",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
            >
                Add Student
            </Button>
            <DataGrid
                sx={{
                    height: "50vh",
                    backgroundColor: "#ecf0f1",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                rows={generateAutoIds(rows)}
                columns={columns}
            />
        </Box>
    );
}

export default TableDataGrid;

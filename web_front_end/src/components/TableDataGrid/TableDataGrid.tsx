import React, { useState, useEffect } from "react";
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
import { RootState, useAppDispatch } from "../../redux/store";
import { tableDataActions } from "../../redux/tableSlice/tableSlice";
import { useSelector } from "react-redux";

interface ITableData {
    id: number;
    name: string;
    address: string;
    mobile: string;
    dob: string;
    gender: string;
    age: number;
}

function TableDataGrid() {
    const [rowModesModel] = useState<GridRowModesModel>({});
    const dispatch = useAppDispatch();
    const studentDataList = useSelector(
        (state: RootState) => state.tableDataList.tableDataEntries,
    );

    useEffect(() => {
        dispatch(tableDataActions.fetchTableData());
    }, [dispatch]);

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

    const transformedStudentData = studentDataList.map((row) => ({
        ...row,
        dob: new Date(row.dob),
    }));

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
                rows={transformedStudentData}
                columns={columns}
            />
        </Box>
    );
}

export default TableDataGrid;

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
    GridRowModel,
    GridRenderEditCellParams,
    GridEditDateCell,
} from "@mui/x-data-grid";
import { RootState, useAppDispatch } from "../../../redux/store";
import { tableDataActions } from "../../../redux/tableSlice/tableSlice";
import { useSelector } from "react-redux";
import {
    maxDate,
    minDate,
    validateAddress,
    validateMobile,
    validateName,
} from "../../../util/validateTable";

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
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
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
            width: 90,
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
            preProcessEditCellProps: validateName,
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
            preProcessEditCellProps: validateAddress,
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
            preProcessEditCellProps: validateMobile,
        },
        {
            field: "dob",
            headerName: "Date of Birth",
            type: "date",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            renderEditCell: (params: GridRenderEditCellParams) => {
                return (
                    <GridEditDateCell
                        {...params}
                        inputProps={{ max: maxDate(), min: minDate() }}
                    />
                );
            },
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            editable: false,
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
                            onClick={handleSaveRowClick(row)}
                            sx={{
                                color: "primary.main",
                            }}
                            className="grid-actions-cell-item"
                        />,
                        <GridActionsCellItem
                            key={id}
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelRowClick(row)}
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
                        onClick={handleEditRowClick(row)}
                        className="grid-actions-cell-items-edit"
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={id}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteRowClick(row)}
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

    function handleAddRow() {
        const id = studentDataList.length + 1;
        const newRow: ITableData = {
            id: id,
            name: "",
            address: "",
            mobile: "",
            dob: maxDate(),
            age: "" as unknown as number,
            gender: "",
        };
        dispatch(tableDataActions.addTableData(newRow));
        setRowModesModel((oldModel) => ({
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
            ...oldModel,
        }));
    }

    const handleSaveRowClick = (row: GridRowModel) => () => {
        setRowModesModel({
            ...rowModesModel,
            [row.id]: { mode: GridRowModes.View },
        });
    };

    function handleProcessRowUpdate(
        newRow: GridRowModel,
        oldRow: GridRowModel,
    ) {
        const { id, ...updatedFields } = newRow;
        const data: ITableData = {
            id,
            name: updatedFields.name as string,
            address: updatedFields.address as string,
            mobile: updatedFields.mobile as string,
            dob: (updatedFields.dob as Date).toISOString(),
            gender: updatedFields.gender as string,
            age: updatedFields.age as number,
        };
        dispatch(tableDataActions.updateTableData(data));
        return Promise.resolve({ ...oldRow, ...newRow });
    }

    const handleEditRowClick = (row: GridRowModel) => () => {
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    const handleDeleteRowClick = (row: GridRowModel) => () => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(tableDataActions.removeTableData(row.id));
        }
    };

    const handleCancelRowClick = (row: GridRowModel) => () => {
        if (!row.someProperty) {
            dispatch(tableDataActions.removeTableData(row.id));
            return;
        }

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.View },
        }));
    };

    return (
        <Box
            sx={{
                backgroundColor: "#ecf0f1",
                padding: "10px",
                borderRadius: "18px",
                overflowX: "auto",
            }}
        >
            <Button
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddRow}
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
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={setRowModesModel}
                processRowUpdate={handleProcessRowUpdate}
            />
        </Box>
    );
}

export default TableDataGrid;

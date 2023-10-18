import React, { useState, useEffect } from "react";
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
    GridPreProcessEditCellProps,
} from "@mui/x-data-grid";
import { RootState, useAppDispatch } from "../../../redux/store";
import { tableDataActions } from "../../../redux/tableSlice/tableSlice";
import { useSelector } from "react-redux";
import {
    addressRegex,
    alerts,
    maxDate,
    minDate,
    mobileRegex,
    nameRegex,
    validateField,
    validateFieldAlerts,
} from "../../../util/validateTable";
import { generateAge } from "../../../util/generateAge";

interface ITableData {
    studentId: number;
    studentName: string;
    studentAddress: string;
    studentMobile: string;
    studentDob: string;
    studentGender: string;
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
            field: "studentId",
            headerName: "ID",
            width: 90,
            headerClassName: "headerCellStyles",
        },
        {
            field: "studentName",
            headerName: "Name",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                return validateField(params, nameRegex, alerts.nameRegex);
            },
        },
        {
            field: "studentGender",
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
            field: "studentAddress",
            headerName: "Address",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                return validateField(params, addressRegex, alerts.addressRegex);
            },
        },
        {
            field: "studentMobile",
            headerName: "Mobile No",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                return validateField(params, mobileRegex, alerts.mobileRegex);
            },
        },
        {
            field: "studentDob",
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
                            onClick={handleSaveRowClick(row.row)}
                            sx={{
                                color: "primary.main",
                                ":hover": {
                                    color: "#0984e3 !important",
                                    cursor: "pointer",
                                },
                            }}
                        />,
                        <GridActionsCellItem
                            key={id}
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelRowClick(row)}
                            color="inherit"
                            sx={{
                                ":hover": {
                                    color: "red !important",
                                    cursor: "pointer",
                                },
                            }}
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={id}
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditRowClick(row)}
                        color="inherit"
                        sx={{
                            ":hover": {
                                color: "green !important",
                                cursor: "pointer",
                            },
                        }}
                    />,
                    <GridActionsCellItem
                        key={id}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteRowClick(row)}
                        color="inherit"
                        sx={{
                            ":hover": {
                                color: "red !important",
                                cursor: "pointer",
                            },
                        }}
                    />,
                ];
            },
        },
    ];

    const transformedStudentData = studentDataList.map(row => ({
        ...row,
        studentDob: new Date(row.studentDob),
        age: generateAge(row.studentDob),
    }));

    function handleAddRow() {
        const newRow: ITableData = {
            studentId: -1,
            studentName: "",
            studentAddress: "",
            studentMobile: "",
            studentDob: maxDate(),
            age: 0,
            studentGender: "",
        };
        dispatch(tableDataActions.addTableData(newRow));
        setRowModesModel((oldModel) => ({
            [newRow.studentId]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
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
        const { studentId, ...updatedFields } = newRow;
        const data: ITableData = {
            studentId,
            studentName: updatedFields.studentName as string,
            studentAddress: updatedFields.studentAddress as string,
            studentMobile: updatedFields.studentMobile as string,
            studentDob: (updatedFields.studentDob as Date).toISOString(),
            studentGender: updatedFields.studentGender as string,
            age: updatedFields.age as number,
        };
        const validations = validateFieldAlerts(data.studentName, data.studentAddress, data.studentMobile);
        if (validations) {
          return Promise.reject(alert(validations));
        }
        
        dispatch(tableDataActions.updateTableData(data));
        dispatch(tableDataActions.fetchTableData());
        return { ...oldRow, ...newRow };
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
                getRowId={(row) => row.studentId}
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

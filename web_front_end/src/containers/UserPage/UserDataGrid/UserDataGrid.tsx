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
} from "@mui/x-data-grid";
import { RootState, useAppDispatch } from "../../../redux/store";
import { userDataActions } from "../../../redux/user/userSlice";
import { useSelector } from "react-redux";

interface IUserData {
    userId: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    role: string;
}

function UserDataGrid() {
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const dispatch = useAppDispatch();
    const userDataLists = useSelector(
        (state: RootState) => state.userDataList.userEntries,
    );

    useEffect(() => {
        dispatch(userDataActions.fetchUsersData());
    }, [dispatch]);

    const columns: GridColDef[] = [
        {
            field: "userId",
            headerName: "ID",
            width: 90,
            headerClassName: "headerCellStyles",
        },
        {
            field: "userName",
            headerName: "User Name",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
        },
        {
            field: "userEmail",
            headerName: "User Email",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
        },
        {
            field: "userPassword",
            headerName: "Password",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
        },
        {
            field: "role",
            headerName: "Role",
            type: "string",
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
                            onClick={handleSaveRowClick(row)}
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

    const transformedUserData = userDataLists.map((row) => ({
        ...row,
    }));

    function handleAddRow() {
        const newRow: IUserData = {
            userId: -1,
            userName: "",
            userEmail: "",
            userPassword: "",
            role: "",
        };
        dispatch(userDataActions.addUserData(newRow));
        setRowModesModel((oldModel) => ({
            [newRow.userEmail]: {
                mode: GridRowModes.Edit,
                fieldToFocus: "studentName",
            },
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
        // const { userId, ...updatedFields } = newRow;
        const { userId, userName, userEmail, userPassword, role } = newRow;
        const data: IUserData = {
            userId: userId,
            // userName: updatedFields.userName as string,
            // userEmail: updatedFields.userEmail as string,
            // userPassword: updatedFields.userPassword as string,
            // role: updatedFields.role as string,
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
            role: role,
        };
        // const validations = validateFieldAlerts(
        //     data.studentName,
        //     data.studentAddress,
        //     data.studentMobile,
        // );
        // if (validations) {
        //     return Promise.reject(alert(validations));
        // }

        dispatch(userDataActions.updateUserData(data));
        return { ...oldRow, ...newRow };
    }

    const handleEditRowClick = (row: GridRowModel) => () => {
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.Edit, fieldToFocus: "userName" },
        }));
    };

    const handleDeleteRowClick = (row: GridRowModel) => () => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(userDataActions.removeUserData(row.id));
        }
    };

    const handleCancelRowClick = (row: GridRowModel) => () => {
        if (!row.someProperty) {
            dispatch(userDataActions.removeUserData(row.id));
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
                Add User
            </Button>
            <DataGrid
                sx={{
                    height: "50vh",
                    backgroundColor: "#ecf0f1",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                rows={transformedUserData}
                getRowId={(row) => row.userEmail}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={setRowModesModel}
                processRowUpdate={handleProcessRowUpdate}
            />
        </Box>
    );
}

export default UserDataGrid;

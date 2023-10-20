import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModel,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useEffect, useState } from "react";
import { studentActions } from "../../../redux/student/slice";
import { userActions } from "../../../redux/user/slice";

interface IUserData {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
}

const UserDataGrid = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const dispatch = useAppDispatch();
  const userList = useSelector((state: RootState) => state.userList.userList);
  // const currentRole = useSelector((state: RootState) => state.userList.currentUserRole);

  useEffect(() => {
    dispatch(userActions.fetchUser());
  }, [dispatch]);

  const handleAddNew = () => {
    const newUser: IUserData = {
      id: 0,
      email: "",
      name: "",
      password: "",
      role: "user",
    };
    dispatch(userActions.addUser(newUser));
    setRowModesModel(oldModel => ({
      [1]: { mode: GridRowModes.Edit, fieldToFocus: "email" },
      ...oldModel,
    }));
  };

  const handleSaveClick = (row: GridRowModel) => () => {
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View },
    });
  };

  const handleCancelClick = (row: GridRowModel) => () => {
    if (row.name == "" || row.mobile == "" || row.address == "" || row.age == 0) {
      dispatch(studentActions.removeStudent(row.id));
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleDeleteClick = (row: GridRowModel) => () => {
    dispatch(userActions.removeUser(row.row.email));
  };

  const handleProcessRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    const { id, email, name, password, role } = newRow;
    const data: IUserData = {
      id: id,
      email: email,
      name: name,
      password: password,
      role: role,
    };

    dispatch(userActions.saveAndUpdateUser(data));
    return Promise.resolve({ ...newRow, ...oldRow });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80, editable: true },
    { field: "email", type: "string", headerName: "Email", width: 250, editable: true },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "password",
      headerName: "Password",
      type: "string",
      width: 180,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["admin", "user"],
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: row => {
        const id = row.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(row.row)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row.row)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() =>
              setRowModesModel(oldModel => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
              }))
            }
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddNew}
        sx={{ mb: 2 }}
      >
        Add User
      </Button>
      <DataGrid
        sx={{
          boxShadow: 4,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          cursor: "pointer",
        }}
        rows={userList.map((user, index) => ({
          id: index + 1,
          email: user.email,
          name: user.name,
          password: user.password,
          role: user.role,
        }))}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={newRowModesModel => {
          setRowModesModel(newRowModesModel);
        }}
        processRowUpdate={handleProcessRowUpdate}
      />
    </Box>
  );
};

export default UserDataGrid;

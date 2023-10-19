import * as React from "react";
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
  GridEventListener,
  GridRowEditStopReasons,
  GridToolbarContainer,
  GridPreProcessEditCellProps,
  GridEditDateCell,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import {
  validateInputUser,
  validateNameInput,
  validateAddressInput,
  validateMobileInput,
  maxDateUser,
  minDateUser,
  validateEmailInput,
  validatePasswordInput,
} from "../../../util/validationUtilUser";
import { generateAge } from "../../../util/generateAgeUtil";
import { userActions } from "../../../redux/user/userSlice";

interface IUserEntry {
  id: number;
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

const UserDataGrid = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const dispatch = useAppDispatch();
  const userList = useSelector((state: RootState) => state.userEntries.userEntries);

  useEffect(() => {
    dispatch(userActions.fetchUser());
  }, [dispatch]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  function EditToolbar() {
    const handleAddNew = () => {
      const newUser: IUserEntry = {
        id: -1,
        roleType: "",
        name: "",
        address: "",
        email: "",
        mobileNumber: "",
        dob: "",
        password: "",
        gender: "",
      };
      dispatch(userActions.addUserEntry(newUser));
      setRowModesModel(oldModel => ({
        [newUser.email]: { mode: GridRowModes.Edit, fieldToFocus: "roleType" },
        ...oldModel,
      }));
    };

    return (
      <GridToolbarContainer
        sx={{
          backgroundColor: "#ecf0f1",
        }}
      >
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          variant="contained"
          sx={{
            "& .MuiButton-label": {
              textTransform: "none",
            },
            margin: "1em",
          }}
        >
          Add User
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleSaveClick = (row: GridRowModel) => () => {
    setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.View } });
  };

  const handleEditClick = (row: GridRowModel) => () => {
    setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (row: GridRowModel) => () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(userActions.deleteUserEntry(row.row.email));
    }
  };

  const handleCancelClick = (row: GridRowModel) => () => {
    if (row.name == "" || row.mobileNumber == "" || row.address == "" || row.age == 0) {
      dispatch(userActions.deleteUserEntry(row.row.email));
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [row.email]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const { id, roleType, name, address, email, mobileNumber, dob, password, gender } = newRow;

    const validationData = [
      { value: name, type: "name" },
      { value: address, type: "address" },
      { value: mobileNumber, type: "mobileNumber" },
      { value: email, type: "email" },
      { value: password, type: "password" },
    ];

    for (const data of validationData) {
      const error = validateInputUser(
        data.value,
        data.type as "name" | "address" | "mobileNumber" | "email" | "password",
      );
      if (error) {
        alert(error);
        if (data.type === "password") {
          console.log(data.value);
        }
        return Promise.resolve();
      }
    }
    const updatedUser: IUserEntry = {
      id: id,
      roleType: roleType,
      name: name,
      address: address,
      email: email,
      mobileNumber: mobileNumber,
      dob: dob,
      password: password,
      gender: gender,
    };
    dispatch(userActions.saveAndUpdateUserEntry(updatedUser));
    return Promise.resolve({ ...oldRow, ...newRow });
  };

  const columns: GridColDef[] = [
    {
      field: "roleType",
      headerName: "RoleType",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 150,
      minWidth: 120,
      headerClassName: "header-cell",
      type: "singleSelect",
      valueOptions: ["ADMIN", "USER"],
    },
    {
      field: "name",
      headerName: "Name",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 250,
      minWidth: 200,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateNameInput(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "green" } };
      },
    },
    {
      field: "address",
      headerName: "Address",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateAddressInput(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "green" } };
      },
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 200,
      minWidth: 150,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateEmailInput(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "green" } };
      },
    },
    {
      field: "mobileNumber",
      headerName: "MobileNumber",
      type: "string",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateMobileInput(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "green" } };
      },
    },
    {
      field: "dob",
      headerName: "Date Of Birth",
      type: "date",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 200,
      minWidth: 150,
      headerClassName: "header-cell",
      renderEditCell: (params: GridRenderEditCellParams) => {
        return (
          <GridEditDateCell {...params} inputProps={{ max: maxDateUser(), min: minDateUser() }} />
        );
      },
    },
    {
      field: "password",
      headerName: "Password",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      type: "string",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validatePasswordInput(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "green" } };
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      type: "singleSelect",
      valueOptions: ["Male", "Female"],
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: false,
      align: "center",
      headerAlign: "center",
      maxWidth: 60,
      minWidth: 40,
      headerClassName: "header-cell",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      maxWidth: 180,
      minWidth: 150,
      headerClassName: "header-cell",
      cellClassName: "actions",
      getActions: row => {
        const id = row.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={
                <SaveIcon
                  sx={{
                    color: "green",
                  }}
                />
              }
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(row)}
            />,
            <GridActionsCellItem
              key={id}
              icon={
                <CancelIcon
                  sx={{
                    color: "blue",
                  }}
                />
              }
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
            icon={
              <EditIcon
                sx={{
                  color: "yellowgreen",
                }}
              />
            }
            label="Edit"
            onClick={handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={
              <DeleteIcon
                sx={{
                  color: "red",
                }}
              />
            }
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "top",
        marginTop: "1em",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          margin: "1em",
          width: "90%",
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
            backgroundColor: "#ecf0f1",
          }}
          rows={userList.map(user => ({
            ...user,
            dob: new Date(user.dob),
            age: generateAge(user.dob),
          }))}
          getRowId={row => row.email}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange =>
            setRowModesModel(handleRowModesModelChange)
          }
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          autoHeight
          slots={{
            toolbar: EditToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default UserDataGrid;

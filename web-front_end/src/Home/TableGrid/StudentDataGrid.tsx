/* eslint-disable react/jsx-no-undef */
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
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { studentActions } from "../../redux/studentSlice";
import {
  validateAddress,
  validateMobileNumber,
  validateName,
  validateNameInput,
  validateAddressInput,
  validateMobileInput,
} from "../../util/validationUtil";

interface IStudentEntry {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNumber: string;
  dateOfBirth: string;
  age: number;
}

const StudentDataGrid = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const dispatch = useAppDispatch();
  const studentList = useSelector((state: RootState) => state.studentEntries.studentEntries);

  useEffect(() => {
    dispatch(studentActions.fetchStudent());
  }, [dispatch]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  function EditToolbar() {
    const handleAddNew = () => {
      const id = studentList.length + 1;
      const newStudent: IStudentEntry = {
        id: id,
        name: "",
        gender: "",
        address: "",
        mobileNumber: "",
        dateOfBirth: "",
        age: 0,
      };
      dispatch(studentActions.addStudentEntry(newStudent));
      setRowModesModel(oldModel => ({
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
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
          Add Student
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
      dispatch(studentActions.deleteStudentEntry(row.id));
    }
  };

  const handleCancelClick = (row: GridRowModel) => () => {
    if (row.name == "" || row.mobileNumber == "" || row.address == "" || row.age == 0) {
      dispatch(studentActions.deleteStudentEntry(row.id));
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const { id, name, gender, address, mobileNumber, dateOfBirth, age } = newRow;

    const nameError = validateName(name);
    if (nameError) {
      alert(nameError);
      return Promise.resolve();
    }

    const addressError = validateAddress(address);
    if (addressError) {
      alert(addressError);
      return Promise.resolve();
    }

    const mobileNumberError = validateMobileNumber(mobileNumber);
    if (mobileNumberError) {
      alert(mobileNumberError);
      console.log(mobileNumber);
      return Promise.resolve();
    }

    const updatedStudent: IStudentEntry = {
      id: id,
      name: name,
      gender: gender,
      address: address,
      mobileNumber: mobileNumber,
      dateOfBirth: dateOfBirth,
      age: age,
    };
    dispatch(studentActions.updateStudentEntry(updatedStudent));
    return Promise.resolve({ ...oldRow, ...newRow });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      editable: false,
      align: "center",
      headerAlign: "center",
      maxWidth: 100,
      minWidth: 60,
      headerClassName: "header-cell",
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
      field: "gender",
      headerName: "Gender",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      type: "singleSelect",
      valueOptions: ["Male", "Female", "Other"],
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
      field: "dateOfBirth",
      headerName: "Date Of Birth",
      type: "date",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 200,
      minWidth: 150,
      headerClassName: "header-cell",
      valueGetter: params => {
        return new Date(params.row.dateOfBirth);
      },
      valueParser: (newValue, field) => {
        const params = field?.row;
        const newDateOfBirth = new Date(newValue);
        const currentDate = new Date();
        const eighteenYearsAgo = new Date(
          currentDate.getFullYear() - 18,
          currentDate.getMonth(),
          currentDate.getDate(),
        );

        if (newDateOfBirth > eighteenYearsAgo) {
          alert("Date of birth must be at least 18 years ago");
          return params.value;
        }

        return newDateOfBirth;
      },
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: false,
      align: "center",
      headerAlign: "center",
      maxWidth: 130,
      minWidth: 100,
      headerClassName: "header-cell",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      maxWidth: 250,
      minWidth: 200,
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
        marginTop: "4em",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          margin: "1em",
          width: "80%",
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
          rows={studentList.map(student => ({
            ...student,
            dateOfBirth: new Date(student.dateOfBirth),
          }))}
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

export default StudentDataGrid;

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
} from "@mui/x-data-grid";
import "./TableGrid.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { studentActions } from "../../redux/studentSlice";

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
  const studentList = useSelector((state: RootState) => state.students.studentEntries);

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
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
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
          Add New
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
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const { id, name, gender, address, mobileNumber, dateOfBirth, age } = newRow;

    const _nameRegExp = /^[a-zA-Z ]+$/;
    const _telNoRegExp = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
    const _addressRegExp = /^[a-zA-Z0-9 ]+$/;

    if (name.trim() === "") {
      alert("Name cannot be empty");
      return Promise.resolve();
    } else if (name.trim().length > 50) {
      alert("Name cannot be longer than 50 characters");
      return Promise.resolve();
    } else if (!_nameRegExp.test(name)) {
      alert("Name can only contain letters and spaces");
      return Promise.resolve();
    } else if (!_addressRegExp.test(address)) {
      alert("Address can only contain letters, numbers, and spaces");
      return Promise.resolve();
    } else if (!_telNoRegExp.test(mobileNumber)) {
      alert("Invalid mobile number");
      console.log(mobileNumber);
      return Promise.resolve();
    } else {
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
    }
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
      valueFormatter: params => {
        return params.value.toLocaleDateString();
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

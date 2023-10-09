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
import { RootState, useAppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { studentActions } from "../../redux/student/slice";
import { validateAddress, validateMobile, validateName } from "../../util/validationUtil";

interface IStudentData {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
  age: number;
}

const StudentDataGrid = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const dispatch = useAppDispatch();
  const studentList = useSelector((state: RootState) => state.studentList.studentList);

  useEffect(() => {
    dispatch(studentActions.fetchStudent());
  }, [dispatch]);

  const handleAddNew = () => {
    const id = studentList.length + 1;
    const newStudent: IStudentData = {
      id: id,
      name: "",
      address: "",
      mobile: "",
      dob: new Date().toISOString(),
      age: 0,
      gender: "Male",
    };
    dispatch(studentActions.addStudent(newStudent));
    setRowModesModel(oldModel => ({
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
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
    dispatch(studentActions.removeStudent(row.id));
  };

  const handleProcessRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const { id, name, address, mobile, dob, gender, age } = newRow;
    const data: IStudentData = {
      id: id as number,
      name: name as string,
      address: address as string,
      mobile: mobile as string,
      dob: (dob as Date).toISOString(),
      gender: gender as string,
      age: age as number,
    };
    if (!validateName(data.name)) return Promise.reject(alert("Invalid Name"));
    if (!validateAddress(data.address)) return Promise.reject(alert("Invalid Address"));
    if (!validateMobile(data.mobile)) return Promise.reject(alert("Invalid Mobile"));
    dispatch(studentActions.updateStudent(data));
    return Promise.resolve({ ...oldRow, ...newRow });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80, editable: true },
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
      field: "address",
      headerName: "Address",
      type: "string",
      width: 180,
      editable: true,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "string",
      width: 180,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Male", "Female"],
    },
    {
      field: "dob",
      headerName: "DOB",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      editable: true,
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
              onClick={handleSaveClick(row)}
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
        Add Student
      </Button>
      <DataGrid
        rows={studentList.map(student => ({
          ...student,
          dob: new Date(student.dob),
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

export default StudentDataGrid;

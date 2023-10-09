import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import "./TableGrid.css";
import { generateID } from "../../util/generateId";

const initialRows: GridRowsProp = [
  {
    id: "1",
    name: "Nimesh",
    gender: "Male",
    address: "Pune",
    mobileNumber: "0771234556",
    dateOfBirth: "1996-01-01",
    age: 25,
  },
  {
    id: "2",
    name: "Nimesh Piyumantha",
    gender: "Male",
    address: "Pune",
    mobileNumber: "0771234556",
    dateOfBirth: "1996-01-01",
    age: 25,
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;
  const id = generateID();
  const newRow = {
    id,
    name: "",
    gender: "",
    address: "",
    mobileNumber: "",
    dateOfBirth: "",
    age: "",
    isNew: true,
  };

  const handleClick = () => {
    setRows((oldRows) => [newRow, ...oldRows]);
    setRowModesModel((oldModel) => ({
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
        onClick={handleClick}
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

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
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
      type: "number",
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
      valueGetter: (params) => {
        return new Date(params.row.dateOfBirth);
      },
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
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
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
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
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={
                <CancelIcon
                  sx={{
                    color: "blue",
                  }}
                />
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <EditIcon
                sx={{
                  color: "yellowgreen",
                }}
              />
            }
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <DeleteIcon
                sx={{
                  color: "red",
                }}
              />
            }
            label="Delete"
            onClick={handleDeleteClick(id)}
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
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          autoHeight
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </Box>
  );
}

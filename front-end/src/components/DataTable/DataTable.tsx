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
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import generateRandomId from "../../util/generateRandomId";
import { initialRows } from "../../util/Data";
import { useDispatch} from "react-redux";
import { setStudent } from "../../redux/studentSlice";
// import { RootState } from "../../redux/store";

// EditToolnarProps is interface its define its type and passing inside editToolBar function
interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

// EditToolBar is return the add new button component and it will creating empty data row abow the rows
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  // handleClick function will be called when user click on add new button and it will create empty row
  const handleClick = () => {
    const id = generateRandomId();
    setRows((oldRows) => [{ id, name: "", age: "", isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  // return the add new button component
  return (
    <GridToolbarContainer>
      <Button
        color="info"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Add new
      </Button>
    </GridToolbarContainer>
  );
}

function DataTable() {
  // rows is the table data and its type
  const [rows, setRows] = React.useState(initialRows as GridRowsProp);
  // each row data will be stored in rowModesModel state
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

 

  //Redux State Update an local state update each others
  const dispatch = useDispatch();
  // const tableRowRedux = useSelector((state: RootState) => state.table.Rows);

  React.useEffect(() => {
    //its conerting date to string function bcz cant pass date object directly to redux store serialization problem
    const newRows = rows.map((row) => {
      return { ...row, dof: row.dof?.toString() };
    });
    dispatch(setStudent(newRows as Array<any>));
    console.log(newRows);
  }, [rows, dispatch]);



  // handleRowEditStop function will be called when user click on save button and it will stop the edit mode
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // handleEditClick function will be called when user click on edit button and it will change the mode to edit mode
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // handleSaveClick function will be called when user click on save button and it will change the mode to view mode
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  // handleDeleteClick function will be called when user click on delete button and it will delete the row
  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // handleCancelClick function will be called when user click on cancel button and it will change the mode to view mode
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

   // If the row was new, we remove it from the rows state.
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // processRowUpdate function will be called when user click on save button and it will update the row
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  // handleRowModesModelChange function will be called when user click on save button its set the rowModesModel state
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  //validated age is 18 or above
  const AgeColumnValidator = (value: any) => {
    const parsedValue = Number(value);
    return isNaN(parsedValue) || parsedValue < 18 ? 18 : parsedValue;
  };

  // columns is the table header and its type and width
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      type: "string",
      width: 180,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 220,
      editable: true,
      type: "string",
      
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
      headerName: "Mobile Number",
      type: "string",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "dof",
      headerName: "Date of Birth",
      type: "date",
      width: 180,
      editable: true,
      valueFormatter: (params) => params.value?.toString().slice(0, 16),
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
      valueParser: AgeColumnValidator,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Command",
      width: 240,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Button
              color="info"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveClick(id)}
            >
              Save
            </Button>,
            <Button
              color="warning"
              variant="contained"
              startIcon={<CancelIcon />}
              onClick={handleCancelClick(id)}
            >
              Cancel
            </Button>,
          ];
        }

        return [
          <Button
            color="info"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditClick(id)}
          >
            Edit
          </Button>,
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick(id)}
          >
            Delete
          </Button>,
        ];
      },
    },
  ];

  // return the table design
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
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

export default DataTable;
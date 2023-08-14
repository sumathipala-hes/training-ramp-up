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
  GridPreProcessEditCellProps,
  GridRenderCellParams,
  GridValueGetterParams,
  GridEditDateCell,
} from "@mui/x-data-grid";
import { minDate, maxDate } from "../../util/dateRange";
import generateRandomId from "../../util/generateRandomId";
import { initialRows } from "../../util/Data";
import { useDispatch, useSelector } from "react-redux";
import { setStudent } from "../../redux/studentSlice";
import { RootState } from "../../redux/store";

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
    setRows((oldRows) => [
      {
        id,
        // name: "",
        // age: "",
        // dof: new Date(),
        // gender: "",
        // address: "",
        // mobile: "",
        // isNew: true,
      },
      ...oldRows,
    ]);
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
        data-testid="add-new1"
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
  const tableRowRedux = useSelector((state: RootState) => state.table.rows);

  React.useEffect(() => {
    //its conerting date to string function bcz cant pass date object directly to redux store serialization problem
    // const newRows = rows.map((row) => {
    //   return { ...row, dof: row.dof?.toString() };
    // });
    // dispatch(setStudent(newRows as Array<any>));
    // console.log(newRows);

    dispatch(setStudent(rows as Array<any>));
    console.log(rows);
  }, [rows, dispatch]);

  React.useEffect(() => {
    setRows(tableRowRedux);
    console.log("from redux store : ",tableRowRedux);
  }, [tableRowRedux]);


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
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length < 3;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Male", "Female", "Other"],
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
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const value = params.props.value?.trim();
        const hasError =
          value !== undefined && value !== "" && !/^\d{10}$/.test(value);
        return {
          ...params.props,
          error: hasError,
        };
      },
    },
    {
      field: "dof",
      headerName: "Date of Birth",
      type: "date",
      width: 180,
      editable: true,
      renderEditCell: (params: GridRenderCellParams) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;

        return isInEditMode ? (
          // Custom cell renderer for the date column in edit mode
          <GridEditDateCell
            {...params}
            inputProps={{ max: maxDate(), min: minDate() }}
          />
        ) : (
          // Default cell renderer for the date column in view mode
          <div>{(params.value as Date).toLocaleDateString()}</div>
        );
      },
      valueGetter: (params: GridValueGetterParams) => {
        // Get the raw value of dateOfBirth
        const rawDateOfBirth = params.value as Date;
        // Convert the rawDateOfBirth into a Date object
        const dateOfBirth = new Date(rawDateOfBirth);
        return dateOfBirth;
      },
    },

    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: false,
      valueGetter: (params: GridValueGetterParams) => {
        const dateOfBirthField = "dof";

        // Access the "Date of Birth" value from the row object
        const rawDateOfBirth = params.row[dateOfBirthField];

        if (rawDateOfBirth) {
          const dateOfBirth = new Date(rawDateOfBirth);

          if (!isNaN(dateOfBirth.getTime())) {
            // Calculate the age based on the date of birth
            const currentDate = new Date();
            const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
            return age;
          }
        }

        // If the value is not a valid date or not set, return an empty value or a placeholder
        return "-";
      },
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
              data-testid={`save-button-${id}`}
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
            data-testid={`edit-button-${id}`}
          >
            Edit
          </Button>,
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick(id)}
            data-testid={`delete-button-${id}`}
          // data-testid='delete-button-123'
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
      role="row12"
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

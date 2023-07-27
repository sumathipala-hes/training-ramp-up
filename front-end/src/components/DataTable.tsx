import { Button, Grid } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {  setRowModesModel, setRows } from '../redux/slice';
import { useEffect } from 'react';

const usedIDs: number[] = [];

const generateID = () => {
  let randomID;
  do {
    randomID = Math.floor(Math.random() * 100);
  } while (usedIDs.includes(randomID));

  usedIDs.push(randomID);
  return randomID;
};

const initialRows: GridRowsProp = [
  {
    id: generateID(),
    name: 'Ted',
    gender: 'Male',
    address: 'toronto',
    mobile: '767778984',
    dateOfBirth: new Date("1990-01-05"),
  },
  {
    id: generateID(),
    name: 'Rachel',
    gender: 'Female',
    address: 'toronto',
    mobile: '67778988',
    dateOfBirth: new Date("2000-07-25"),
  },
  {
    id: generateID(),
    name: 'Justin',
    gender: 'Male',
    address: 'Ohio',
    mobile: '767778909',
    dateOfBirth: new Date("2002-03-02"),
  },
  {
    id: generateID(),
    name: 'Emma',
    gender: 'Female',
    address: 'toronto',
    mobile: '767778899',
    dateOfBirth: new Date("1995-01-05"),
  },

];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

export const DataTable = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: any) => state.data.records);
  const rowModesModel = useSelector((state: any) => state.data.rowModesModel);

  useEffect(() => {
    dispatch(setRows(initialRows));
  }, [dispatch])

  const EditToolbar = (props: EditToolbarProps) => {   
    const handleAddClick = () => {
      const id = generateID();
      const newRow = { id, name: '', gender: '', address: '', mobile: '', dateOfBirth: '', age: '', isNew: true };

      dispatch(
        setRows([newRow, ...rows]), //add to the begining of the table
      );

      dispatch(
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }),
      );
    };

    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={handleAddClick}
          sx={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          Add New
        </Button>
      </GridToolbarContainer>
    );
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    dispatch(setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } }));
  };

  const handleSaveClick = (id: GridRowId) => () => {
    dispatch(setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } }));
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(setRows(rows.filter((row: { id: GridRowId }) => row.id !== id)));
  };


  const handleCancelClick = (id: GridRowId) => () => {
    dispatch(setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const editedRow = rows.find((row: { id: GridRowId; }) => row.id === id);
    if (editedRow!.isNew) {
      dispatch(setRows(rows.filter((row: { id: GridRowId; }) => row.id !== id)));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(setRows(rows.map((row: GridRowModel) => (row.id === newRow.id ? updatedRow : row))));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { 
      field: 'gender', 
      headerName: 'Gender', 
      width: 150, 
      editable: true, 
      type: 'singleSelect',
      valueOptions: ['Male', 'Female']
    },
    { field: 'address', headerName: 'Address', width: 150, editable: true },
    { 
      field: 'mobile', 
      headerName: 'Mobile No', 
      width: 150, editable: true,
    type: 'number' },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 150,
      valueGetter: (params) => {
        const dob = new Date(params.row.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        return age;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Button
              aria-label="save"
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSaveClick(id)}
            >
              Save
            </Button>,
            <Button
              aria-label="cancel"
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleCancelClick(id)}
            >
              Cancel
            </Button>,
          ];
        }

        return [
          <Button
            aria-label="edit"
            variant="contained"
            color="error"
            size="small"
            onClick={handleEditClick(id)}
          >
            Edit
          </Button>,
          <Button
            aria-label="delete"
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleDeleteClick(id)}
          >
            Delete
          </Button>,
        ];
      },
    },
  ];

  return (
    <Grid>
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
      ></DataGrid>
    </Grid>
  );
};
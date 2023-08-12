import { Alert, AlertProps, Button, Grid, TextField } from '@mui/material';
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
  GridValidRowModel,
  GridEditDateCell
} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { setRowModesModel, setRows } from '../redux/slice';
import { useEffect } from 'react';
import { generateID } from '../utils/GenerateIds';
import { createStudent, deleteStudent, getAllStudents, updateStudent } from '../redux/actions';
import { Student } from '../interfaces/studentInterface';
import React from 'react';
import Snackbar from '@mui/material/Snackbar'

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

const EditToolbar = (props: EditToolbarProps) => {
  const dispatch = useDispatch();
  const rows = useSelector((state: any) => state.data.records);
  const rowModesModel = useSelector((state: any) => state.data.rowModesModel);
  const handleAddClick = () => {
    const id = generateID();
    const newRow = {
      id,
      name: '',
      gender: '',
      address: '',
      mobile: '',
      dateOfBirth: '',
      age: '',
      isNew: true,
    };

    dispatch(
      setRows([newRow, ...rows]),
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

export const DataTable = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: any) => state.data.records);
  const rowModesModel = useSelector((state: any) => state.data.rowModesModel);

    //api call to get list
    useEffect(() => {
      dispatch(getAllStudents());
    }, [dispatch]);

  // useEffect(() => {
  //   dispatch(setRows(initialRows));
  // }, [dispatch]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    dispatch(
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } }),
    );
  };


  const handleDeleteClick = (id: GridRowId) => () => {
    const studentId = Number(id);
      dispatch(deleteStudent(studentId));   
  };


  const handleCancelClick = (id: GridRowId) => () => {
    dispatch(
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      }),
    );
    const editedRow = rows.find((row: { id: GridRowId }) => row.id === id);
    if (editedRow!.isNew) {
      dispatch(setRows(rows.filter((row: { id: GridRowId }) => row.id !== id)));
    }
  };

  const handleSaveClick = (id: GridRowId, ) => async () => {
    const editedRow = rows.find((row: { id: GridRowId; }) => row.id === id);
    if (editedRow?.isNew) {
      dispatch(
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View },
        })
      );
    }
    else {
    dispatch(
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } }),
    );
  };
}

  const processRowUpdate = (newRow: GridRowModel): GridValidRowModel | Promise<GridValidRowModel> => {
    //find an existing row to update
    let existingRow  = rows.find((row: GridRowModel) => row.id === newRow.id);

    const today = new Date();
    const dob = newRow.dob;

    if (newRow.name.trim() === '') {
      return Promise.reject(new Error("Please fill name"));
    } else if (newRow.gender.trim() === '') {
      return Promise.reject(new Error("Please select gender"));
    } else if (newRow.address.trim() === '') {
      return Promise.reject(new Error("Please fill address"));
    } else if (typeof newRow.mobile === 'string' && newRow.mobile.trim() === '') {
      return Promise.reject(new Error("Please fill mobile"));
    } else if (isNaN(dob)) {
      return Promise.reject(new Error("Please select date of birth"));
    }



    const updatedRow: Student = {
      ...existingRow,
      name: newRow.name,
      gender: newRow.gender,
      address: newRow.address,
      mobile: typeof newRow.mobile === 'string' ? Number(newRow.mobile) : newRow.mobile,
      dob: newRow.dob,
      age: today.getFullYear() - dob.getFullYear(),
    };

    if (newRow.isNew) {
      dispatch(createStudent(updatedRow)); 
    } else {
      dispatch(updateStudent(updatedRow.id, updatedRow));
    }
  
    return updatedRow;
  };

  const [snackbar, setSnackbar] = React.useState<Pick<
  AlertProps,
  'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Male', 'Female'],
    },
    { field: 'address', headerName: 'Address', width: 150, editable: true },
    {
      field: 'mobile',
      headerName: 'Mobile No',
      width: 150,
      editable: true,
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      width: 150,
      editable: true,
      type: 'date',
      valueGetter: (params) => {
        const dateOfBirthStr = params.value;
        const dateOfBirth = new Date(dateOfBirthStr);
        return dateOfBirth;
      },
      renderEditCell: (params) => {
        return (
          <GridEditDateCell
            {...params}
            renderInput={(props: { InputProps: any; }) => (
              <TextField
                {...props}
                InputProps={{
                  ...props.InputProps,
                  inputProps: {
                    max: new Date(2005, 11, 31),
                    min: new Date(1985, 0, 1),
                  },
                }}
              />
            )}
          />
        );
      },
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 150,
      valueGetter: (params) => {
        const dob = new Date(params.row.dob);
        const today = new Date();
        let age: number | string = '';
        if (!params.row.isNew) {
          age = today.getFullYear() - dob.getFullYear();
        }
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
        } else {

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
      };
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
        disableVirtualization
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      ></DataGrid>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Grid>
  );
};

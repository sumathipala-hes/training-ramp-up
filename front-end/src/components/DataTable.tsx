import { Button, Grid } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowsProp,
} from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInitialRows, addStudent, setRowModesModel} from '../redux/slice';


const usedIDs: number[] = [];

const generateID = () => {
  let randomID;
  do {
    randomID = Math.floor(Math.random() * 100);
  } while (usedIDs.includes(randomID));

  usedIDs.push(randomID);
  return randomID;
};

interface GridRowProps {
  id: GridRowId;
  name: string;
  gender: string;
  address: string;
  mobile: string;
  dateOfBirth: string;

}


const initialRows: GridRowsProp = [
  {
    id: generateID(),
    name: 'Alex',
    gender: 'Male',
    address: 'toronto',
    mobile: '0767778989',
    dateOfBirth: '1998-01-01',
  },
  {
    id: generateID(),
    name: 'Ted',
    gender: 'Male',
    address: 'toronto',
    mobile: '0767778984',
    dateOfBirth: '1993-01-01',
  },
  {
    id: generateID(),
    name: 'Rachel',
    gender: 'Female',
    address: 'toronto',
    mobile: '0767778988',
    dateOfBirth: '1992-01-01',
  },
  {
    id: generateID(),
    name: 'Justin',
    gender: 'Male',
    address: 'Ohio',
    mobile: '0767778909',
    dateOfBirth: '1994-01-01',
  },
  {
    id: generateID(),
    name: 'Emma',
    gender: 'Female',
    address: 'toronto',
    mobile: '0767778899',
    dateOfBirth: '2010-01-01',
  },
];


export const DataTable = () => {
  const dispatch = useDispatch();
  const records = useSelector((state: { data: { records: GridRowProps[] } }) => state.data.records);
  const rowModesModel = useSelector((state: any ) => state.data.rowModesModel);

  React.useEffect(() => {
    dispatch(addInitialRows(initialRows));
  }, [dispatch]);

  //ADD CLICK
  const handleAddClick = () => {
    const id = generateID();
    const newRow: GridRowProps = {
      id: id,
      name: '',
      gender: '',
      address: '',
      mobile: '',
      dateOfBirth: ''
    };
    dispatch(addStudent([...records, newRow]));

    const newMode = { id: { mode: GridRowModes.Edit, fieldToFocus: 'name' } };
    dispatch(setRowModesModel(newMode));
  };
  
  //EDIT CLICK
  const handleEditClick = (id: GridRowId) => () => {
    dispatch(setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } }));
   };
  //SAVE CLICK
  const handleSaveClick = (id: GridRowId) => () => {
    dispatch(setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } }));
  }

  //DELETE CLICK
   const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(addStudent(records.filter((student: { id: GridRowId; }) => student.id !== id)));
  };
  //CANCEL CLICK
  const handleCancelClick = (id: GridRowId) => () => {
    dispatch(setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }))
  }


  




  const handleRowModesModelChange = (newRowModesModel: any) => {}

  

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'mobile', headerName: 'Mobile No', width: 150 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 150 },
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
              variant="contained"
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
      <Button color="primary" onClick={handleAddClick} sx={{ display: 'flex', justifyContent: 'flex-start' }}>Add New</Button>
      <DataGrid 
      rows={records} 
      columns={columns}
      editMode='row'
      rowModesModel={{rowModesModel}}
      onRowModesModelChange={handleRowModesModelChange}
      ></DataGrid>
    </Grid>
  );
};

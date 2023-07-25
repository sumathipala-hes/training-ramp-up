import { Button, Grid } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import React from 'react';

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
    age: 26,
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
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

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
      <DataGrid rows={rows} columns={columns}></DataGrid>
    </Grid>
  );
};

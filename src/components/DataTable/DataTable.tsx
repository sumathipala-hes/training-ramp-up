import * as React from 'react';
import { styled, Button, Box } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';
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
  GridRenderCellParams,
} from '@mui/x-data-grid';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomId,
//   randomArrayItem,
// } from '@mui/x-data-grid-generator';

// const roles = ['Market', 'Finance', 'Development'];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  borderRadius:'0',
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'rgba(33, 150, 243, 0.08)', 
  },
  '& .MuiDataGrid-cell': {
    padding: '16px',
  },
}));

const StyledButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap:'32px',
  padding: '0',
}));

const initialRows: GridRowsProp = [
  {id: 1, name:'Sudarshan', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday: new Date('2000.04.17'), age:31},
  {id: 2, name:'Amila', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 3, name:'Buddika', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2010-04-17'), age:31},
  {id: 4, name:'Charith', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 5, name:'Dasun', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 6, name:'Eshan', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 7, name:'Fernando', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 8, name:'Gandika', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 9, name:'Hansaka', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 10, name:'Ishan', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = initialRows.length + 1;
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function DataTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
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

  const columns: GridColDef[] =  [
    { field: 'id', headerName: 'ID',sortable: false, width: 64, disableColumnMenu: true, type: 'number'},
    { field: 'name', headerName: 'Name', width: 135, disableColumnMenu: true, type: 'string' },
    { field: 'gender', headerName: 'Gender', width: 137, disableColumnMenu: true , sortable: false, type: 'string' },
    { field: 'address', headerName: 'Address', width: 137, disableColumnMenu: true, sortable: false, type: 'string' },
    { field: 'mobileNumber', headerName: 'Mobile No:', width: 135, disableColumnMenu: true, sortable: false, type: 'string' },
    { field: 'birthday', headerName: 'Date of Birth', width: 175, disableColumnMenu: true, type: 'date',
    valueFormatter: (params) => {
      const valueFormatted = params.value instanceof Date ? params.value.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '';
      return valueFormatted;
    },
    },
    { field: 'age',headerName: 'Age',width: 101, disableColumnMenu: true, sortable: false, type: 'number', headerAlign:'left', align:'left',
    valueGetter(params) {
      return new Date().getFullYear() - params.row.birthday.getFullYear();
    },
    },
    { field: 'actions',headerName: 'Actions',width: 216, disableColumnMenu: true, sortable: false,
      renderCell: (params: GridRenderCellParams) => (
         <StyledButtonBox>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              console.log("Edit button clicked");
            }}
          >
            EDIT
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => {
              console.log("Delete button clicked");
            }}
          >
            REMOVE
          </Button>
        </StyledButtonBox>    
      ),
    }
  ];
  
  //[
  //   { field: 'name', headerName: 'Name', width: 180, editable: true },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 80,
  //     align: 'left',
  //     headerAlign: 'left',
  //     editable: true,
  //   },
  //   {
  //     field: 'joinDate',
  //     headerName: 'Join date',
  //     type: 'any',
  //     width: 180,
  //     editable: true,
  //   },
  //   {
  //     field: 'role',
  //     headerName: 'Department',
  //     width: 220,
  //     editable: true,
  //     type: 'singleSelect',
  //     valueOptions: ['Market', 'Finance', 'Development'],
  //   },
  //   {
  //     field: 'actions',
  //     type: 'actions',
  //     headerName: 'Actions',
  //     width: 100,
  //     cellClassName: 'actions',
  //     getActions: ({ id }) => {
  //       const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  //       if (isInEditMode) {
  //         return [
  //           <GridActionsCellItem
  //             icon={<Button>Save</Button>}
  //             label="Save"
  //             sx={{
  //               color: 'primary.main',
  //             }}
  //             onClick={handleSaveClick(id)}
  //           />,
  //           <GridActionsCellItem
  //             icon={<Button>Cancel</Button>}
  //             label="Cancel"
  //             className="textPrimary"
  //             onClick={handleCancelClick(id)}
  //             color="inherit"
  //           />,
  //         ];
  //       }

  //       return [
  //         <GridActionsCellItem
  //           icon={<Button>Edit</Button>}
  //           label="Edit"
  //           className="textPrimary"
  //           onClick={handleEditClick(id)}
  //           color="inherit"
  //         />,
  //         <GridActionsCellItem
  //           icon={<Button>Delete</Button>}
  //           label="Delete"
  //           onClick={handleDeleteClick(id)}
  //           color="inherit"
  //         />,
  //       ];
  //     },
  //   },
  // ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <StyledDataGrid
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
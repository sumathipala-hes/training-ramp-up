import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Button } from '@mui/material'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 150,
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 200,
        editable: true,
    },
    {
        field: 'mobileNumber',
        headerName: 'Mobile No',
        type: 'number',
        width: 170,
        editable: true,
    },
    {
        field: 'dateOfBirth',
        headerName: 'Date of Birth',
        type: 'date',
        width: 190,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'commandAction',
        headerName: 'Command',
        width: 300,
        renderCell: () => {
            return (
                <>
                    <Button variant="contained" color="error">
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="inherit"
                        sx={{ marginLeft: '10px' }}
                    >
                        Remove
                    </Button>
                </>
            )
        },
    },
]

const rows = [
    { id: 1, name: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, name: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, name: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, name: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, name: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, name: 'Melisandre', firstName: null, age: 150 },
    { id: 7, name: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, name: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, name: 'Roxie', firstName: 'Harvey', age: 65 },
]

export default function DataGridDemo() {
    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <>
                <Button
                    variant="contained"
                    color="inherit"
                    sx={{ marginLeft: '10px', marginBottom: '10px' }}
                >
                    Add New
                </Button>
            </>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                pageSizeOptions={[8]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}

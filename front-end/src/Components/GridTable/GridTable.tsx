import * as React from 'react'
import Box from '@mui/material/Box'

import {
    DataGrid,
    GridColDef,
    GridRowsProp,
    GridValueGetterParams,
} from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { useState } from 'react'
import TextField from '@mui/material/TextField'

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
        width: 180,
        editable: true,
    },
    {
        field: 'mobileNumber',
        headerName: 'Mobile No',
        type: 'string',
        width: 100,
        editable: true,
    },
    {
        field: 'dateOfBirth',
        headerName: 'Date of Birth',
        type: 'date',
        width: 160,
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

const rows: GridRowsProp = [
    {
        id: 1,
        name: 'Snow',
        gender: 'Male',
        address: 'Colombo',
        mobileNumber: '712345678',
        firstName: 'Jon',
        age: 35,
    },
    {
        id: 2,
        name: 'Lannister',
        gender: 'Female',
        address: 'Colombo',
        mobileNumber: '712345678',
        firstName: 'Cersei',
        age: 42,
    },
    {
        id: 3,
        name: 'Lannister',
        gender: 'Male',
        address: 'Colombo',
        mobileNumber: '712345678',
        firstName: 'Jaime',
        age: 45,
    },
    {
        id: 4,
        name: 'Stark',
        gender: 'Female',
        address: 'Colombo',
        mobileNumber: '712345678',
        firstName: 'Arya',
        age: 16,
    },
    {
        id: 5,
        name: 'Targaryen',
        gender: 'Male',
        address: 'Colombo',
        mobileNumber: '712345678',
        firstName: 'Daenerys',
        age: null,
    },
    {
        id: 6,
        name: 'Melisandre',
        gender: 'Female',
        address: 'Colombo',
        mobileNumber: '712345678',
        firstName: null,
        age: 150,
    },
    {
        id: 7,
        name: 'Clifford',
        gender: 'Female',
        address: 'Colombo',
        mobileNumber: '712345678',
        firstName: 'Ferrara',
        age: 44,
    },
    {
        id: 8,
        name: 'Frances',
        gender: 'Female',
        address: 'Colombo',
        mobileNumber: '712345678',
        firstName: 'Rossini',
        age: 36,
    },
    {
        id: 9,
        name: 'Roxie',
        gender: 'Male',
        address: 'Colombo',
        mobileNumber: '712345678',
        firstName: 'Harvey',
        age: 65,
    },
]

export default function DataGridDemo() {
    const [editableRow, setEditableRow] = useState(false)
    const handleClick = () => {
        setEditableRow((prevState) => !prevState)
    }
    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <>
                <Button
                    variant="contained"
                    color="inherit"
                    sx={{ marginLeft: '10px', marginBottom: '10px' }}
                    onClick={handleClick}
                >
                    Add New
                </Button>
            </>
            {editableRow && <TextField>ABD</TextField>}
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

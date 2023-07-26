/* eslint-disable react/jsx-key */
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { randomId } from '@mui/x-data-grid-generator'
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowsProp,
    GridToolbarContainer,
    GridValueGetterParams,
} from '@mui/x-data-grid'
import { addRow, updateRow, deleteRow } from './GridSlice' // Import the actions
import { RootState } from '../../store'

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void
}

function EditToolbar(props: EditToolbarProps) {
    const { setRowModesModel } = props
    const dispatch = useDispatch()

    const handleClick = () => {
        const id = randomId()
        const newRow: GridRowModel = {
            id,
            name: '',
            age: '',
            mobileNumber: '',
            address: '',
            isNew: true,
        }
        dispatch(addRow(newRow))
        setRowModesModel((oldModel) => ({
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            ...oldModel,
        }))
    }

    return (
        <GridToolbarContainer>
            <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClick}
            >
                Add record
            </Button>
        </GridToolbarContainer>
    )
}

export default function FullFeaturedCrudGrid() {
    const dispatch = useDispatch()
    const rows = useSelector((state: RootState) => state.grid.rows)
    console.log(rows)

    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    )

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true
        }

        // Find the edited row by its ID
        const editedRow = rows.find((row) => row.id === params.id)
        if (editedRow) {
            // If it's not a new row, dispatch the updateRow action with the edited row data
            if (!editedRow.isNew) {
                dispatch(updateRow({ ...editedRow, isNew: false }))
            }
            // If it's a new row and the user didn't make any changes, remove the new row from the store
            else if (
                !editedRow.name &&
                !editedRow.age &&
                !editedRow.mobileNumber &&
                !editedRow.address
            ) {
                dispatch(deleteRow(editedRow.id))
            }

            // Set the row mode to view mode
            setRowModesModel({
                ...rowModesModel,
                [params.id]: { mode: GridRowModes.View },
            })
        }
    }

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        })
    }

    const handleSaveClick = (id: GridRowId) => () => {
        const editedRow = rows.find((row) => row.id === id)
        if (editedRow) {
            // Dispatch the updateRow action with the edited row data
            dispatch(updateRow({ ...editedRow, isNew: false }))
            // Set the row mode to view mode
            setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View },
            })
        }
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        dispatch(deleteRow(id))
    }

    const handleCancelClick = (id: GridRowId) => () => {
        const editedRow = rows.find((row) => row.id === id)

        if (editedRow) {
            // If the row is in edit mode, update row mode to "View" and ignore modifications
            setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
            })
        } else {
            // If the row is a newly added row, remove it from the Redux store
            dispatch(deleteRow(id)) // Dispatch action to delete the row from the Redux store
        }
    }

    const processRowUpdate = (newRow: GridRowModel) => {
        // Check if the row is new or already existing
        if (newRow.isNew) {
            // If it's a new row, dispatch an action to add the row to the Redux store
            const newRowWithoutId = { ...newRow, id: randomId(), isNew: false }
            dispatch(addRow(newRowWithoutId)) // Dispatch action to add the row to the Redux store
            return newRowWithoutId // Return the updated row
        } else {
            // If it's an existing row, dispatch an action to update the row in the Redux store
            dispatch(updateRow(newRow)) // Dispatch action to update the row in the Redux store
            return newRow // Return the updated row
        }
    }

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel)
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'dateOfBirth',
            headerName: 'Date of Birth',
            type: 'date',
            width: 180,
            editable: true,
            valueGetter: (params: GridValueGetterParams) => {
                // Get the raw value of dateOfBirth
                const rawDateOfBirth = params.value as Date
                // Convert the rawDateOfBirth into a Date object
                const dateOfBirth = new Date(rawDateOfBirth)
                return dateOfBirth
            },
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Male', 'Female', 'Other'],
        },
        {
            field: 'mobileNumber',
            headerName: 'Mobile No',
            width: 180,
            editable: true,
            type: 'string',
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 180,
            editable: true,
            type: 'string',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Command',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ]
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ]
            },
        },
    ]

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
            <DataGrid
                slots={{
                    toolbar: EditToolbar,
                }}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slotProps={{
                    toolbar: { setRowModesModel },
                }}
            />
        </Box>
    )
}

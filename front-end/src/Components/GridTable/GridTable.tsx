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
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEditDateCell,
    GridEventListener,
    GridRenderCellParams,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridToolbarContainer,
    GridValidRowModel,
    GridValueGetterParams,
} from '@mui/x-data-grid'
import { addRow, updateRow, deleteRow, deleteRowTableOnly } from './GridSlice' // Import the actions
import { RootState } from '../../store'
import { minDate, maxDate } from './GridTableUtility/min_maxDate'
import { socket } from '../../App'
import randomInteger from 'random-int'
// import { count } from '../../sagas'

export default function FullFeaturedCrudGrid() {
    const dispatch = useDispatch()
    const rows = useSelector((state: RootState) => state.grid.rows)

    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    )
    // Initialize the addButtonDisabled state
    const [addButtonDisabled, setAddButtonDisabled] = React.useState(false)
    function EditToolbar() {
        const dispatch = useDispatch()

        const handleClick = () => {
            const id = randomInteger(10, 100000)
            console.log(id)
            setAddButtonDisabled(true)
            const newRow: GridRowModel = {
                id,
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
                {
                    <Button
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleClick}
                        disabled={addButtonDisabled}
                    >
                        Add record
                    </Button>
                }
            </GridToolbarContainer>
        )
    }

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
                dispatch(updateRow({ ...editedRow }))
            } else {
                dispatch(deleteRowTableOnly(editedRow.id))
            }
            // If it's a new row and the user didn't make any changes, remove the new row from the store

            // Set the row mode to view mode
            setRowModesModel((rowModesModel) => ({
                ...rowModesModel,
                [params.id]: { mode: GridRowModes.View },
            }))
        }
        setAddButtonDisabled(false)
    }

    const handleEditClick = (id: GridRowId) => () => {
        setAddButtonDisabled(true)
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        })
    }

    const handleSaveClick = (id: GridRowId) => () => {
        const editedRow = rows.find((row) => row.id === id)
        if (editedRow) {
            // Dispatch the updateRow action with the edited row data
            dispatch(updateRow(editedRow))

            // Set the row mode to view mode
            setRowModesModel((prevModesModel) => ({
                ...prevModesModel,
                [id]: { mode: GridRowModes.View },
            }))
        }

        setAddButtonDisabled(false)
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        dispatch(deleteRow(id))
        socket.emit('deleteStudent', 'A Student Deleted from Table')
    }

    const handleCancelClick = (id: GridRowId) => () => {
        const editedRow = rows.find((row) => row.id === id)

        if (editedRow) {
            // If the row is in edit mode, update row mode to "View" and ignore modifications
            setRowModesModel((prevModesModel) => ({
                ...prevModesModel,
                [id]: { mode: GridRowModes.View },
            }))
            setAddButtonDisabled(false)
            if (editedRow.isNew) {
                // If the row is a newly added row, remove it from the Redux store
                dispatch(deleteRowTableOnly(id)) // Dispatch action to delete the row from the Redux store
                // Enable the Add record button
                console.log('handleCancelClick')
                setAddButtonDisabled(false)
            }
        }
    }

    const processRowUpdate = (newRow: GridValidRowModel) => {
        // Check if the row is new or already existing
        if (newRow.isNew) {
            // Check for empty fields in the newRow object
            if (!newRow.name || !newRow.mobileNumber || !newRow.address) {
                alert('Please fill in all required fields.')
                // Return a rejected Promise to keep the row in edit mode
                return Promise.reject()
            }
            // Dispatch an action to add the row to the Redux store
            const newRowWithoutId = newRow
            const oldRowSetToFalse = { ...newRow, isNew: false }
            dispatch(updateRow(newRowWithoutId))
            socket.emit('newStudent', 'New Student Added')

            return oldRowSetToFalse // Return the updated row
        } else if (!newRow.isNew && newRow.name) {
            console.log(newRow)
            // If it's an existing row, dispatch an action to update the row in the Redux store
            dispatch(updateRow(newRow)) // Dispatch action to update the row in the Redux store
            socket.emit('updateStudent', 'Student Details Updated')
            return newRow // Return the updated row
        } else {
            console.log(newRow.name)
            return newRow
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
            type: 'string',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            valueGetter: (params: GridValueGetterParams) => {
                const dateOfBirthField = 'dateOfBirth'

                // Access the "Date of Birth" value from the row object
                const rawDateOfBirth = params.row[dateOfBirthField]

                if (rawDateOfBirth) {
                    const dateOfBirth = new Date(rawDateOfBirth)

                    if (!isNaN(dateOfBirth.getTime())) {
                        // Calculate the age based on the date of birth
                        const currentDate = new Date()
                        const age =
                            currentDate.getFullYear() -
                            dateOfBirth.getFullYear()
                        return age
                    }
                }

                // If the value is not a valid date or not set, return an empty value or a placeholder
                return '-'
            },
        },
        {
            field: 'dateOfBirth',
            headerName: 'Date of Birth',
            type: 'date',
            width: 180,
            editable: true,
            renderEditCell: (params: GridRenderCellParams) => {
                const isInEditMode =
                    rowModesModel[params.id]?.mode === GridRowModes.Edit

                return isInEditMode ? (
                    // Custom cell renderer for the date column in edit mode
                    <GridEditDateCell
                        {...params}
                        inputProps={{ max: maxDate(), min: minDate() }}
                    />
                ) : (
                    // Default cell renderer for the date column in view mode
                    <div>{(params.value as Date).toLocaleDateString()}</div>
                )
            },
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
            type: 'number',
            valueFormatter: (params) => {
                // Convert the number to a string without formatting commas
                return String(params.value)
            },
            valueParser: (value) => {
                // Parse the string back to a number (remove commas if present)
                return parseFloat(value.replace(/,/g, ''))
            },
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
                            name="SaveButton"
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
                        label="EditRow"
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
                onProcessRowUpdateError={(error) => {
                    // Handle the error here
                    console.error('Error processing row update:', error)
                    // You can also display a user-friendly message or take appropriate actions
                }}
                processRowUpdate={processRowUpdate}
                slotProps={{
                    toolbar: { rowModesModel, setRowModesModel },
                }}
                disableVirtualization
            />
        </Box>
    )
}

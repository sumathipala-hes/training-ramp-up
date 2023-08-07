import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowModes, GridRowModesModel,  GridRenderEditCellParams, GridEditDateCell,} from "@mui/x-data-grid";
import { useSelector,useDispatch } from 'react-redux';
import { alerts, calculateAge, capitalizeFirstLetter, generateAutoIds, maxDate, minDate, renderBirthdayCell, validations } from "../../utils";
import { tableActions } from "../../redux/tableData/tableSlice";
import EditInputCell from "../../components/EditInputCell/EditInputCell";

interface rowData {
  id:number,
  name: string,
  gender: string,
  address: string,
  mobile: string
  birthday: string,
  age: number,
}

function handleEditCell(params: GridRenderEditCellParams){
  return <EditInputCell {...params} />;
}

function DataTable(props: { isTesting: any; }) {
  const dispatch = useDispatch();

  //initialize rows and id
  const rows = useSelector((state: {table: any; rows:rowData[]} ) => state.table.rows);
  const rowId = useSelector((state: {table: any; rows:rowData[]} ) => state.table.id);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isDisabled, setDisabled] = useState(true);
  const [isAddDisabled, setAddDisabeld] = useState(false);
  const [isUpdating, setUpdate] = useState(false);
  const [isDisabUpBtn, setDisableUp] = useState(false);

    //set columns
    const columns: GridColDef[] = [
      {
        field: "id",
        headerName: "ID",
        width: 40,
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        editable:false,
      },
      {
        field: "name",
        headerName: "Name",
        width: 150,
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        editable:true,
        preProcessEditCellProps: (params:any)=>{
          if( /^\d{10}$/.test(params.otherFieldsProps.mobile.value) && params.otherFieldsProps.address.value !== "" && params.props.value.length > 0 && !isNaN(params.otherFieldsProps.birthday.value) && (params.otherFieldsProps.birthday.value).toString() !== 'Invalid Date'){
            setDisabled(false);
          }else{
            setDisabled(true);
          }
            const hasError = params.props.value.length < 1;
            return { ...params.props, error:hasError, alert:alerts.name};
        },
        renderEditCell: handleEditCell,
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 150,
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        editable:true,
        type: 'singleSelect',
        valueOptions: ['male', 'female'],
      },
      {
        field: "address",
        headerName: "Address",
        width: 150,
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        editable:true,
        preProcessEditCellProps: validations.address,
        renderEditCell: handleEditCell,
      },
      {
        field: "mobile",
        headerName: "Mobile No",
        width: 150,
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        editable:true,
        preProcessEditCellProps: validations.mobile,
        renderEditCell: handleEditCell,
      },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 100,
        align: "left",
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        editable:false,
        valueGetter: (params) => {
          const studentAge = calculateAge(params.row.birthday)
          return studentAge;
        },
      },
      {
        field: "birthday",
        headerName: "Date of Birth",
        type:"date",
        width: 150,
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        renderCell: renderBirthdayCell,
        renderEditCell: (params: GridRenderEditCellParams) =>{
          return <GridEditDateCell {...params} inputProps={{max: maxDate(),min: minDate(),}}/>;
        },
        editable:true,
      },
      {
        field: "command",
        headerName: "Command",
        type: "actions",
        width: 250,
        getActions: (row) => {
          const { id } = row;
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          //set buttons according to row's model
          if (isInEditMode) {
            return [
              <Button size="small" disabled={props.isTesting?false : isDisabled} variant="contained" sx={{ marginRight: "10px" }} onClick={() => handleSaveChanges({ row })}>
                {isUpdating? "Update" :"Add"}
              </Button>,
              <Button size="small" color="error" variant="contained" onClick={() => handleDiscardChanges({ row })}>
                Discard Changes
              </Button>
            ];
          }
  
          return [
            <Button size="small" disabled={isDisabUpBtn} variant="contained" sx={{ marginRight: "10px" }}onClick={() => handleUpdates({ row })}>
              Edit
            </Button>,
            <Button size="small" color="error" variant="contained" onClick={() => handleRemove({ row })}>
              Remove
            </Button>
          ];
        },
      },
    ];

  //add button event handler
  function addRowHandler() {
    const newEditableRow:rowData= {
      id: 100, 
      name: "",
      gender: "male",
      address: "",
      mobile: "",
      birthday:"yy-mm-dd",
      age: 0,
    };

    dispatch(tableActions.addStudent(newEditableRow));
    setRowModesModel({ [rowId + 1]: { mode: GridRowModes.Edit } });
    setAddDisabeld(true);
    setDisableUp(true);
  }
  
  //handle row updates
  function handleUpdates(row:any) {
    const id  = row.row.id;
    setUpdate(true);
    setDisableUp(true);
    setRowModesModel({ [id]: { mode: GridRowModes.Edit } });
    setAddDisabeld(true);
  }

  //handle row removes
  function handleRemove(row:any){
    const id  = row.row.id;
    dispatch(tableActions.removeStudent(id));
  }

  //discard button event handler
  function handleDiscardChanges(row:any) {
    const id  = row.row.id;
    if(!isUpdating){
      dispatch(tableActions.removeStudent(id));
      setDisableUp(false);
    }else{
      setRowModesModel({ [id]: { mode: GridRowModes.View, ignoreModifications: true} });
      setUpdate(false);
      setDisableUp(false);
    }
    setDisabled(true);
    setAddDisabeld(false);
  }

  //save button event handler
  function handleSaveChanges(row:any) {
    const id  = row.row.id;
    if(!isUpdating){
      dispatch(tableActions.updateId());
    }else{
      setUpdate(false);
    }
    setDisableUp(false);
    setRowModesModel({ [id]: { mode: GridRowModes.View} });
  }

  //row update process handler
  const handleProcessRowUpdate = (newRow:any, oldRow:any) => {
    const paramsValue = new Date(newRow.birthday);
    const day = paramsValue.getDate().toString().padStart(2, '0');
    const month = (paramsValue.getMonth() + 1).toString().padStart(2, '0');
    const year = paramsValue.getFullYear().toString();
    const newRows:any= {
      id: newRow.id, 
      name: capitalizeFirstLetter(newRow.name),
      gender: newRow.gender,
      address: newRow.address,
      mobile: newRow.mobile,
      birthday: `${year}-${month}-${day}`,
      age: newRow.age,
    };
    dispatch(tableActions.updateRow(newRows));
    setDisabled(true);
    setAddDisabeld(false);
    return newRow;
}

//row update error handler
const handleProcessRowUpdateError = React.useCallback((error: Error) => {
  console.log(error)
}, []);

  return (
    <Container maxWidth="xl" sx={{display: "flex",justifyContent:"start", flexDirection:"column", alignItems: "center",minHeight: "100vh", padding:"80px 20px"}}>
      <Button onClick={addRowHandler} disabled={isAddDisabled} variant="contained" sx={{marginBottom:"20px"}}> Add new</Button>
      <Container sx={{display: "flex" , justifyContent:"center", overflow:"hidden"}}>
      <DataGrid
      disableVirtualization
      getRowId={(row) => row?.id}
        sx={{
          maxWidth: 1200,
          "& .cellStyles": { borderRight: 1, padding: "10px 15px " },
          "& .even": { backgroundColor: "rgb(224 224 224)" },
        }}
        autoHeight
        rows={generateAutoIds(rows)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        getRowClassName={(params) =>params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"}
        editMode="row"
        rowModesModel={rowModesModel}
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
      </Container>
    </Container>
  );
}
export default DataTable;

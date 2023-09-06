import React, {  useEffect} from "react";
import { Container} from "@mui/material";
import { DataGrid, GridColDef,  GridRenderEditCellParams, GridEditDateCell,} from "@mui/x-data-grid";
import { useSelector,useDispatch } from 'react-redux';
import { generateAutoIds, maxDate, minDate, renderBirthdayCell } from "../../utils";
import { tableActions } from "../../redux/tableData/tableSlice";

interface rowData {
  id:number,
  name: string,
  gender: string,
  address: string,
  mobile: string
  birthday: string,
  age: number,
}

function ViewStuTable(props: { isTesting: any; }) {
  const dispatch = useDispatch();

  //initialize table's rows by getting student data from the database
  useEffect(() =>{
    dispatch(tableActions.fetchStudents());
  },[]);

  //initialize rows and id
  const rows = useSelector((state: {table: any; rows:rowData[]} ) => state.table.rows);

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
        editable:false,
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 150,
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        editable:false,
        type: 'singleSelect',
        valueOptions: ['male', 'female'],
      },
      {
        field: "address",
        headerName: "Address",
        width: 150,
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        editable:false
      },
      {
        field: "mobile",
        headerName: "Mobile No",
        width: 150,
        headerClassName: "cellStyles",
        cellClassName: "cellStyles",
        editable:false,
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
        editable:false,
      }
    ];
  return (
    <Container maxWidth="xl" sx={{display: "flex",justifyContent:"start", flexDirection:"column", alignItems: "center",minHeight: "100vh", padding:"120px 20px"}}>
      <Container sx={{display: "flex" , justifyContent:"center", overflow:"hidden"}}>
      <DataGrid
      disableVirtualization
      getRowId={(row) => row?.id}
        sx={{
          maxWidth: 902,
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
      />
      </Container>
    </Container>
  );
}
export default ViewStuTable;

import React from "react";
import { Container, Button } from "@mui/material";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import { useSelector } from 'react-redux';
import { generateAutoIds } from "../utils";

//set columns
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 40,
    headerClassName: "cellStyles",
    cellClassName: "cellStyles",
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    headerClassName: "cellStyles",
    cellClassName: "cellStyles",
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
    headerClassName: "cellStyles",
    cellClassName: "cellStyles",
  },
  {
    field: "address",
    headerName: "Address",
    width: 120,
    headerClassName: "cellStyles",
    cellClassName: "cellStyles",
  },
  {
    field: "mobile",
    headerName: "Mobile No",
    width: 110,
    headerClassName: "cellStyles",
    cellClassName: "cellStyles",
  },
  {
    field: "birthday",
    headerName: "Date of Birth",
    type: "date",
    width: 120,
    headerClassName: "cellStyles",
    cellClassName: "cellStyles",
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 100,
    align: "left",
    headerClassName: "cellStyles",
    cellClassName: "cellStyles",
  },
  {
    field: "command",
    headerName: "Command",
    width: 180,
    renderCell: (params: any) => (
      <React.Fragment>
        <Button size="small" variant="contained" sx={{ marginRight: "10px" }}>
          Edit
        </Button>
        <Button size="small" color="error" variant="contained">
          Remove
        </Button>
      </React.Fragment>
    ),
  },
];

function DataTable() {
  //set rows
  const rows = useSelector((state: {table: any; rows:any} ) => state.table.rows);

  return (
    <Container maxWidth="xl" sx={{display: "flex",justifyContent: "center",alignItems: "center",minHeight: "100vh",}}>
      <DataGrid
        sx={{
          maxWidth: 950,
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
      />
    </Container>
  );
}
export default DataTable;

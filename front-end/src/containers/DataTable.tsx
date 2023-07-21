import React from "react";
import { Container, Button } from "@mui/material";
import { DataGrid, GridColDef} from "@mui/x-data-grid";

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

const rows = [
  {
    name: "John",
    gender: "male",
    address: "Jon",
    mobile: 715426257,
    birthday: new Date("2023-06-29"),
    age: 35,
  },
  {
    name: "Alice",
    gender: "female",
    address: "Wonderland",
    mobile: 715426257,
    birthday: new Date("2023-07-19"),
    age: 32,
  },
  {
    name: "Michael",
    gender: "male",
    address: "New York",
    mobile: 715426257,
    birthday: new Date("2023-09-18"),
    age: 38,
  },
  {
    name: "Emma",
    gender: "female",
    address: "London",
    mobile: 715426257,
    birthday: new Date("2023-05-04"),
    age: 27,
  },
  {
    name: "Daniel",
    gender: "male",
    address: "Paris",
    mobile: 715426257,
    birthday: new Date("2023-03-04"),
    age: 34,
  },
  {
    name: "Olivia",
    gender: "female",
    address: "Los Angeles",
    mobile: 715426257,
    birthday: new Date("2023-12-14"),
    age: 30,
  },
  {
    name: "William",
    gender: "male",
    address: "Sydney",
    mobile: 715426257,
    birthday: new Date("2023-11-25"),
    age: 41,
  },
  {
    name: "Sophia",
    gender: "female",
    address: "Berlin",
    mobile: 715426257,
    birthday: new Date("2023-09-10"),
    age: 24,
  },
  {
    name: "Alexander",
    gender: "male",
    address: "Moscow",
    mobile: 715426257,
    birthday: new Date("2022-03-25"),
    age: 36,
  },
];

const generateAutoIds = (
  rows: {
    name: string;
    gender: string;
    address: string;
    mobile: number;
    birthday: Date;
    age: number;
  }[]
) => {
  return rows.map((row, index) => ({ ...row, id: index + 1 }));
};

function DataTable() {
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

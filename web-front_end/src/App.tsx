import * as React from "react";
import { Box } from "@mui/material";
import StudentDataGrid from "./components/TableGrid/TableGrid";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <StudentDataGrid />
      </Box>
    </Provider>
  );
}

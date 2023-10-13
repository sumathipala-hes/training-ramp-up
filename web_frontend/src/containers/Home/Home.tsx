import React from "react";
import { Box } from "@mui/material";
import StudentDataGrid from "./StudentDataGrid";

const Home = () => {
  return (
    <Box sx={{ py: 20, px: 40 }}>
      <StudentDataGrid />
    </Box>
  );
};

export default Home;

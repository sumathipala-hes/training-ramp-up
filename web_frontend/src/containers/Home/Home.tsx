import React from "react";
import { Box } from "@mui/material";
import StudentDataGrid from "./StudentDataGrid";

const Home = () => {
  return (
    <Box sx={{ p: 10 }}>
      <StudentDataGrid />
    </Box>
  );
};

export default Home;

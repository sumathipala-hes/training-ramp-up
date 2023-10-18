import React from "react";
import { Box } from "@mui/material";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";

const StudentPage = () => {
  return (
    <Box sx={{ py: 20, px: 40 }}>
      <StudentDataGrid />
    </Box>
  );
};

export default StudentPage;

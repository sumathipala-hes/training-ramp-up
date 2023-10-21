import React from "react";
import { Box } from "@mui/material";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import Header from "../../components/Header/Header";

const StudentPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ py: 20, px: 40 }}>
        <StudentDataGrid />
      </Box>
    </>
  );
};

export default StudentPage;

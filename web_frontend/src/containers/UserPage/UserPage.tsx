import React from "react";
import { Box } from "@mui/material";
import UserDataGrid from "./UserDataGrid/UserDataGrid";

const StudentPage = () => {
  return (
    <Box sx={{ py: 20, px: 40 }}>
      <UserDataGrid />
    </Box>
  );
};

export default StudentPage;

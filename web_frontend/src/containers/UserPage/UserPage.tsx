import React from "react";
import { Box } from "@mui/material";
import UserDataGrid from "./UserDataGrid/UserDataGrid";
import Header from "../../components/Header/Header";

const StudentPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ py: 20, px: 40 }}>
        <UserDataGrid />
      </Box>
    </>
  );
};

export default StudentPage;

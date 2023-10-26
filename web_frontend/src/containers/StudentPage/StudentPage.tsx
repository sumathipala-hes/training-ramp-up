import React from "react";
import { Box, Button } from "@mui/material";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { USER_ROUTE } from "../../util/routeUtil";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const StudentPage = () => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.userList.currentUserRole);
  return (
    <>
      <Header />
      {role === "admin" && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ position: "fixed", top: 100, right: 100 }}
          onClick={() => {
            navigate(USER_ROUTE);
          }}
        >
          Manage Users
        </Button>
      )}
      <Box sx={{ py: 26, px: 40 }}>
        <StudentDataGrid />
      </Box>
    </>
  );
};

export default StudentPage;

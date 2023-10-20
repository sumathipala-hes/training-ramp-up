import React, { useState } from "react";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import UserDataGrid from "./UserDataGrid/UserDataGrid";
import { Button, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home = () => {
  const currentRoleType = useSelector((state: RootState) => state.userEntries.currentRoleType);
  const [showStudentData, setShowStudentData] = useState(currentRoleType === "USER" ? false : true);
  const [showUserData, setShowUserData] = useState(currentRoleType === "USER" ? true : false);

  const handleStudentButtonClick = () => {
    setShowStudentData(true);
    setShowUserData(false);
  };

  const handleUserButtonClick = () => {
    setShowStudentData(false);
    setShowUserData(true);
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center" paddingTop="2em">
            {currentRoleType === "ADMIN" && (
              <>
                <Button
                  variant="contained"
                  onClick={handleStudentButtonClick}
                  sx={{ margin: "1em" }}
                >
                  Student Manage
                </Button>
                <Button variant="contained" onClick={handleUserButtonClick} sx={{ margin: "1em" }}>
                  User Manage
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>

      {showStudentData && <StudentDataGrid />}
      {showUserData && <UserDataGrid />}
    </>
  );
};

export default Home;

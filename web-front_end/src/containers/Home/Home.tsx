<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import UserDataGrid from "./UserDataGrid/UserDataGrid";
import { Button, Grid, Box } from "@mui/material";
=======
import React from "react";
=======
import React from "react";
<<<<<<< HEAD
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
=======
>>>>>>> 0e0d31c5377a874afb6daee5eeb80edb20c04117
import StudentDataGrid from "./TableGrid/StudentDataGrid";
>>>>>>> 093921abfadb77a12d4976083084e82ae5ca29db

const Home = () => {
  const [showStudentData, setShowStudentData] = useState(false);
  const [showUserData, setShowUserData] = useState(true);

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
            <Button variant="contained" onClick={handleUserButtonClick} sx={{ margin: "1em" }}>
              User Manage
            </Button>
            <Button variant="contained" onClick={handleStudentButtonClick} sx={{ margin: "1em" }}>
              Student Manage
            </Button>
          </Box>
        </Grid>
      </Grid>

      {showStudentData && <StudentDataGrid />}
      {showUserData && <UserDataGrid />}
    </>
  );
};

export default Home;

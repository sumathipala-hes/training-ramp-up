<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> aa72d29a4ac51500fa17301bf21521c302ba4c0b
import React, { useState } from "react";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import UserDataGrid from "./UserDataGrid/UserDataGrid";
import { Button, Grid, Box } from "@mui/material";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { userActions } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { SIGN_IN } from "../../util/routesUtil";
=======
>>>>>>> aa72d29a4ac51500fa17301bf21521c302ba4c0b
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
  const currentRoleType = useSelector((state: RootState) => state.userEntries.currentRoleType);
  const [showStudentData, setShowStudentData] = useState(currentRoleType === "USER" ? false : true);
  const [showUserData, setShowUserData] = useState(currentRoleType === "USER" ? true : false);

  const dispatch = useAppDispatch();
  const navigator = useNavigate();

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
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
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
        <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              dispatch(userActions.signOut());
              navigator(SIGN_IN);
            }}
            sx={{ margin: "1em" }}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        </Grid>
      </Grid>

      {showStudentData && <StudentDataGrid />}
      {showUserData && <UserDataGrid />}
    </>
  );
};

export default Home;

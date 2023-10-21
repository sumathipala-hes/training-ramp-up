import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "../../redux/store";
import { userActions } from "../../redux/user/slice";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../util/routeUtil";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Box sx={{ height: 80, background: "blue", position: "fixed", width: "100%" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems={"center"}
        sx={{ height: "100%", px: 4 }}
      >
        <Grid item>
          <Grid container alignItems={"center"} gap={2}>
            <AddRoadIcon sx={{ fontSize: 30, color: "white" }} />
            <Typography
              color={"white"}
              sx={{ m: 0, p: 0 }}
              variant="h5"
              component="div"
              gutterBottom
            >
              Ramp Up
            </Typography>
          </Grid>
        </Grid>
        <IconButton
          onClick={() => {
            alert("You have been logged out");
            dispatch(userActions.signOut());
            navigate(DEFAULT_ROUTE);
          }}
        >
          <LogoutIcon sx={{ fontSize: 30, color: "white" }} />
        </IconButton>
      </Grid>
    </Box>
  );
};

export default Header;

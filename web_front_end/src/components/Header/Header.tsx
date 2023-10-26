import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { userDataActions } from "../../redux/user/userSlice";
import { ROUTE_SIGNIN } from "../../util/routes";

export default function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: 50,
                background: "#44BCE7",
                position: "fixed",
                width: "98%",
                padding: "0 20px",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Typography
                    color="white"
                    sx={{ fontFamily: "Ubuntu, sans-serif", fontWeight: "600" }}
                    variant="h5"
                >
                    ᖇᗩᗰᑭ ᑌᑭ
                </Typography>
            </Box>
            <IconButton
                onClick={() => {
                    alert("You have been logged out");
                    dispatch(userDataActions.signOutData());
                    navigate(ROUTE_SIGNIN);
                }}
            >
                <LogoutIcon sx={{ fontSize: 25, color: "white" }} />
            </IconButton>
        </Box>
    );
}

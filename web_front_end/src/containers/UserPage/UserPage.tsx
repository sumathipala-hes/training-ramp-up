import React from "react";
import { Box } from "@mui/material";
import UserDataGrid from "./UserDataGrid/UserDataGrid";

export default function UserPage() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                padding: "0 50px 0 50px",
            }}
        >
            <UserDataGrid />
        </Box>
    );
}

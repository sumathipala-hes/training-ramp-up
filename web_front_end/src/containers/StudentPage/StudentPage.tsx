import React from "react";
import { Box } from "@mui/material";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";

export default function StudentPage() {
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
            <StudentDataGrid />
        </Box>
    );
}

import React from "react";
import { Box } from "@mui/material";
import TableDataGrid from "./TableDataGrid/TableDataGrid";

export default function Home() {
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
            <TableDataGrid />
        </Box>
    );
}

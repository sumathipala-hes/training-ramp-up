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
            }}
        >
            <TableDataGrid />
        </Box>
    );
}

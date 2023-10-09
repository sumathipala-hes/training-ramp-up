import * as React from "react";
import { Box } from "@mui/material";
import FullFeaturedCrudGrid from "./components/TableGrid/TableGrid";

export default function App() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowX: "auto",
      }}
    >
      <FullFeaturedCrudGrid/>
    </Box>
  );
}

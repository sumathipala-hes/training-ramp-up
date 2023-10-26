import * as React from "react";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./containers/Home/Home";

export default function App() {
  return (
    <Provider store={store}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Home />
      </Box>
    </Provider>
  );
}

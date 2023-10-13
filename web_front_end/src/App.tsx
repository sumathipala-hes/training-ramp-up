import React from "react";
import { Box } from "@mui/material";
import RootRouter from "./components/RootRouter/RootRouter/RootRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <Box>
                <RootRouter />
            </Box>
        </Provider>
    );
}

export default App;

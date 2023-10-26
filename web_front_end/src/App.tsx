import React from "react";
import { Box } from "@mui/material";
import RootRouter from "./components/RootRouter/RootRouter/RootRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
import Notification from "./components/Notification/Notification";

function App() {
    return (
        <Provider store={store}>
            <Box>
                <RootRouter />
                <Notification />
            </Box>
        </Provider>
    );
}

export default App;

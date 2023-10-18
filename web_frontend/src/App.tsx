import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Notification from "./components/Notification/Notification";
import RootRoutes from "./components/RootRoutes/RootRoutes";

const App = () => {
  return (
    <Provider store={store}>
      <RootRoutes />
      <Notification />
    </Provider>
  );
};

export default App;

import React from "react";
import { Provider } from "react-redux";
import Home from "./containers/Home/Home";
import store from "./redux/store";
import Notification from "./components/Notification/Notification";

const App = () => {
  return (
    <Provider store={store}>
      <Home />
      <Notification />
    </Provider>
  );
};

export default App;

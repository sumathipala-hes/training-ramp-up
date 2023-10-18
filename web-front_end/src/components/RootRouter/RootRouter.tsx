import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../containers/Home/Home";
import { HOME, SIGN_IN } from "../../util/RoutesUtil";
import SignIn from "../../containers/SignIn/SignIn";

const RootRouter = () => {
  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path={SIGN_IN} element={<SignIn />} />
    </Routes>
  );
};

export default RootRouter;

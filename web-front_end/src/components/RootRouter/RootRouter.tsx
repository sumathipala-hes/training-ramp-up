import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../containers/Home/Home";
import { HOME, SIGN_IN, SIGN_UP } from "../../util/routesUtil";
import SignIn from "../../containers/SignIn/SignIn";
import SignUp from "../../containers/SignUp/SignUp";

const RootRouter = () => {
  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path={SIGN_IN} element={<SignIn />} />
      <Route path={SIGN_UP} element={<SignUp />} />
    </Routes>
  );
};

export default RootRouter;

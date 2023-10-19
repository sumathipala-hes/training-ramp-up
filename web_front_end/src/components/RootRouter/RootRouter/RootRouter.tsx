import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTE_HOME, ROUTE_SIGNIN, ROUTE_SIGNUP } from "../../../util/routes";
import Home from "../../../containers/Home/Home";
import SignIn from "../../../containers/SignIn/SignIn";
import SignUp from "../../../containers/SignUp/SignUp";

export default function Content() {
  return (
    <Routes>
      <Route path={ROUTE_HOME} element={<Home />}  />
      <Route path={ROUTE_SIGNIN} element={<SignIn />} />
      <Route path={ROUTE_SIGNUP} element={<SignUp />} />
    </Routes>
  );
}

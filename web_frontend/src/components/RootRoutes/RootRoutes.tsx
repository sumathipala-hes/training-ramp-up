import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../../containers/SignIn/SignIn";
import Home from "../../containers/Home/Home";
import { DEFAULT_ROUTE, STUDENT_ROUTE } from "../../util/routeUtil";

const RootRoutes = () => {
  return (
    <Routes>
      <Route path={DEFAULT_ROUTE} element={<SignIn />} />
      <Route path={STUDENT_ROUTE} element={<Home />} />
    </Routes>
  );
};

export default RootRoutes;

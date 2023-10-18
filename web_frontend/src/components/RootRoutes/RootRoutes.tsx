import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../../containers/SignIn/SignIn";
import { DEFAULT_ROUTE, REGISTER_ROUTE, STUDENT_ROUTE } from "../../util/routeUtil";
import Registration from "../../containers/Registration/Registration";
import StudentPage from "../../containers/StudentPage/StudentPage";

const RootRoutes = () => {
  return (
    <Routes>
      <Route path={DEFAULT_ROUTE} element={<SignIn />} />
      <Route path={STUDENT_ROUTE} element={<StudentPage />} />
      <Route path={REGISTER_ROUTE} element={<Registration />} />
    </Routes>
  );
};

export default RootRoutes;

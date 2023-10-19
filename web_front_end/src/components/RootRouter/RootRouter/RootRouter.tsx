import React from "react";
import { Route, Routes } from "react-router-dom";
import { STUDENT_ROUTE, ROUTE_SIGNIN, ROUTE_SIGNUP } from "../../../util/routes";
import StudentPage from "../../../containers/StudentPage/StudentPage";
import SignIn from "../../../containers/SignIn/SignIn";
import SignUp from "../../../containers/SignUp/SignUp";

export default function Content() {
  return (
    <Routes>
      <Route path={STUDENT_ROUTE} element={<StudentPage />}  />
      <Route path={ROUTE_SIGNIN} element={<SignIn />} />
      <Route path={ROUTE_SIGNUP} element={<SignUp />} />
    </Routes>
  );
}

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  DEFAULT_ROUTE,
  HOME_ROUTE,
  REGISTER_ROUTE,
  STUDENT_ROUTE,
  USER_ROUTE,
} from "../../util/routeUtil";
import Registration from "../../containers/Registration/Registration";
import StudentPage from "../../containers/StudentPage/StudentPage";
import UserPage from "../../containers/UserPage/UserPage";
import SignInPage from "../../containers/SignInPage/SignInPage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import HomePage from "../../containers/HomePage/HomePage";

const RootRoutes = () => {
  const isAuthenticated = useSelector((state: RootState) => state.userList.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(HOME_ROUTE);
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path={DEFAULT_ROUTE} element={<SignInPage />} />
      <Route path={HOME_ROUTE} element={<HomePage />} />
      <Route path={STUDENT_ROUTE} element={<StudentPage />} />
      <Route path={USER_ROUTE} element={<UserPage />} />
      <Route path={REGISTER_ROUTE} element={<Registration />} />
    </Routes>
  );
};

export default RootRoutes;

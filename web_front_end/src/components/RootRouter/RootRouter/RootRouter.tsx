import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    ROUTE_STUDENT,
    ROUTE_SIGNIN,
    ROUTE_SIGNUP,
    ROUTE_USER,
} from "../../../util/routes";
import StudentPage from "../../../containers/StudentPage/StudentPage";
import SignInPage from "../../../containers/SignInPage/SignInPage";
import SignUpPage from "../../../containers/SignUpPage/SignUpPage";
import UserPage from "../../../containers/UserPage/UserPage";

export default function Content() {
    return (
        <Routes>
            <Route path={ROUTE_STUDENT} element={<StudentPage />} />
            <Route path={ROUTE_SIGNIN} element={<SignInPage />} />
            <Route path={ROUTE_SIGNUP} element={<SignUpPage />} />
            <Route path={ROUTE_USER} element={<UserPage />} />
        </Routes>
    );
}

import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    ROUTE_SIGNIN,
    ROUTE_SIGNUP,
    ROUTE_HOME,
} from "../../../util/routes";
import SignInPage from "../../../containers/SignInPage/SignInPage";
import SignUpPage from "../../../containers/SignUpPage/SignUpPage";
import HomePage from "../../../containers/HomePage/HomePage";

export default function Content() {
    return (
        <Routes>
            <Route path={ROUTE_SIGNIN} element={<SignInPage />} />
            <Route path={ROUTE_SIGNUP} element={<SignUpPage />} />
            <Route path={ROUTE_HOME} element={<HomePage />} />
        </Routes>
    );
}

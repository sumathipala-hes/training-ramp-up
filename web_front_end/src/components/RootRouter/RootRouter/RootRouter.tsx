import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ROUTE_SIGNIN, ROUTE_SIGNUP, ROUTE_HOME } from "../../../util/routes";
import SignInPage from "../../../containers/SignInPage/SignInPage";
import SignUpPage from "../../../containers/SignUpPage/SignUpPage";
import HomePage from "../../../containers/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { userDataActions } from "../../../redux/user/userSlice";

export default function Content() {
    const isAuthenticated = useSelector(
        (state: RootState) => state.userDataList.isAuthenticated,
    );
    const currentUserEmail = useSelector((state: RootState) => state.userDataList.currentUserEmail);
    const currentUserRole = useSelector((state: RootState) => state.userDataList.currentUserRole);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(userDataActions.setCurrentUser(currentUserEmail));
            dispatch(userDataActions.setCurrentUserRoleData(currentUserRole));
            navigate(ROUTE_HOME);
        } else {
            navigate(ROUTE_SIGNIN);
        }
    }, [isAuthenticated]);

    return (
        <Routes>
            <Route path={ROUTE_SIGNIN} element={<SignInPage />} />
            <Route path={ROUTE_SIGNUP} element={<SignUpPage />} />
            <Route path={ROUTE_HOME} element={<HomePage />} />
        </Routes>
    );
}

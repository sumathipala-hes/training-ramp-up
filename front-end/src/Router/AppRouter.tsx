import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LogIn from '../Components/LogInPage/LogIn'
import StudentTable from '../Components/GridTable/GridTable'
import StudentTablePlain from '../Components/GridTable/GridTableWithoutButtons'
import SignUp from '../Components/SignUpPage/SignUp'
import Users from '../Components/Users/Users'
import { ProtectedRoutes } from './protecctedRoutes'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function AppRouter() {
    const logged = useSelector((store: RootState) => store.logIn.authState)
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route element={<ProtectedRoutes logged={logged} />}>
                    <Route path="/student-table" element={<StudentTable />} />
                    <Route
                        path="/student-table-plain"
                        element={<StudentTablePlain />}
                    />
                    <Route path="/users-list" element={<Users />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LogIn from '../Components/LogInPage/LogIn'
import StudentTable from '../Components/GridTable/GridTable'
import SignUp from '../Components/SignUpPage/SignUp'

function AppRouter() {
    return (
        <Router>
            <Routes>{routeSignInToStudentTable}</Routes>
        </Router>
    )
}

const routeSignInToStudentTable = (
    <>
        <Route path="/" element={<LogIn />} />
        <Route path="/student-table" element={<StudentTable />} />
        <Route path="/sign-up" element={<SignUp />} />
    </>
)

export default AppRouter

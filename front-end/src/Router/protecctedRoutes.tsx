/* eslint-disable react/react-in-jsx-scope */
import { Outlet } from 'react-router-dom'
import LogIn from '../Components/LogInPage/LogIn'
import StudentTablePlain from '../Components/GridTable/GridTableWithoutButtons'

const ProtectedRoutes = ({
    logged,
    role,
}: {
    logged: boolean
    role: string
}) => {
    if (role === 'ADMIN') {
        return logged && role === 'ADMIN' ? <Outlet /> : <LogIn />
    } else {
        return logged && role === 'USER' ? <StudentTablePlain /> : <LogIn />
    }
}

export { ProtectedRoutes }

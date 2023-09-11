import { Outlet } from 'react-router-dom'
import LogIn from '../Components/LogInPage/LogIn'
import { useState } from 'react'

const useAuth = (status: boolean) => {
    const user = { loggedIn: status }
    return user && user.loggedIn
}

export const setAuthState = (status: boolean) => {
    const [logged, setLogged] = useState(false)

    status !== logged ? setLogged(status) : null
    // eslint-disable-next-line react/react-in-jsx-scope
}

const ProtectedRoutes = ({ logged }: { logged: boolean }) => {
    // const isAuth = useAuth()
    // eslint-disable-next-line react/react-in-jsx-scope
    return logged ? <Outlet /> : <LogIn />
}

export { ProtectedRoutes, useAuth }

import { Outlet } from 'react-router-dom'
import LogIn from '../Components/LogInPage/LogIn'

const ProtectedRoutes = ({ logged }: { logged: boolean }) => {
    // const isAuth = useAuth()
    // eslint-disable-next-line react/react-in-jsx-scope
    return logged ? <Outlet /> : <LogIn />
}

export { ProtectedRoutes }

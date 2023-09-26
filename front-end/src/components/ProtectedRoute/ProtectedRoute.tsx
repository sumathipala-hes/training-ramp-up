import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
 
const Protected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = useSelector((state: any) => state.user.authStatus);
 
    if(!isAuthenticated) {
        return <Navigate to='/' />
    }
    return <Outlet />
};

export default Protected;

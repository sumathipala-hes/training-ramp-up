import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../../redux/slices/userSlice";
import Loading from "../Loading/Loading";

const ProtectedRoute = ({ children }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const logingError = useSelector((state: any) => state.user.logingError);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  if (user !== null) {
    return children;
  } else {
    if (logingError) {
      return <Navigate to="/login" replace />;
    } else {
      return <Loading />;
    }
  }
};

export default ProtectedRoute;

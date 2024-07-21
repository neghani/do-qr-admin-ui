
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('userToken');
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
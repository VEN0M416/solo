import { Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
    const [cookies] = useCookies(['sessionId']);
    return cookies.sessionId ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../providers/GlobalProvider";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(GlobalContext)

    if(loading) {
        return <progress className="progress w-full"></progress>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" replace></Navigate>;
};

export default PrivateRoute;
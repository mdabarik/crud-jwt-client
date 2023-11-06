import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../providers/GlobalProvider";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(GlobalContext)


    if(loading) {
        return <progress className="progress w-56"></progress>
    }

    if(user?.email){
        return children;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" replace></Navigate>;

    // return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../contexts/authContextProvider";

const PrivateRoutes = () => {
   const { signed, userSigned } = useContext(AuthenticationContext);
   return signed || userSigned ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoutes };

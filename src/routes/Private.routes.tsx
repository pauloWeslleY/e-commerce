import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../contexts/authContextProvider";

const PrivateRoutes = () => {
   const { signed, signedOnGoogle } = useContext(AuthenticationContext);
   return signed || signedOnGoogle ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoutes };

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../contexts/authContextProvider";
import { auth } from "../services/firebase";

const PrivateRoutes = () => {
   const { signedOnGoogle } = useContext(AuthenticationContext);
   const currentUser = auth.currentUser;

   return currentUser || signedOnGoogle ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoutes };

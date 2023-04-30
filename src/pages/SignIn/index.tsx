import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SignIn } from "./SignIn";
import { AuthenticationContext } from "../../contexts/authContextProvider";

export const Login = () => {
   const { signed } = useContext(AuthenticationContext);

   return !signed ? <SignIn /> : <Navigate to="/dashboard" />;
};

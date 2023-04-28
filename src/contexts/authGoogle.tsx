import { ReactNode, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import { Navigate } from "react-router-dom";
import { UserType } from "../types/UsersType";

interface AuthContextProps {
   userAuth?: any | UserType;
   signed: any;
   handleGoogleSignIn: () => Promise<void>;
   signOut: () => void;
}

interface AuthGoogleProviderProps {
   children: ReactNode;
}

const provider = new GoogleAuthProvider();
export const AuthGoogleContext = createContext({} as AuthContextProps);

export const AuthGoogleProvider = ({ children }: AuthGoogleProviderProps) => {
   const [userAuth, setUserAuth] = useState(null);

   const handleGoogleSignIn = (): any => {
      signInWithPopup(auth, provider)
         .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const users = result.user;
            setUserAuth(users);
            sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(users));
         })
         .catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            const email = err.email;
            const credential = GoogleAuthProvider.credentialFromError(err);

            console.log(`
               ${errorCode}
               ${errorMessage}
               ${email}
               ${credential}
            `);
         });
   };

   useEffect(() => {
      const localStorageAuth = () => {
         const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
         const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
         if (sessionToken && sessionUser) {
            setUserAuth(sessionUser);
         }
      };

      localStorageAuth();
   }, []);

   function signOut() {
      sessionStorage.clear();
      setUserAuth(null);

      return <Navigate to="/" />;
   }

   return (
      <AuthGoogleContext.Provider
         value={{
            handleGoogleSignIn,
            signed: !!userAuth,
            userAuth,
            signOut,
         }}
      >
         {children}
      </AuthGoogleContext.Provider>
   );
};

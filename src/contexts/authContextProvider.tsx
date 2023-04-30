import { ReactNode, createContext, useEffect, useState } from "react";
import {
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { Navigate } from "react-router-dom";
import { UserType } from "../types/UsersType";

interface AuthContextProps {
   userAuthGoogle: UserType | any;
   signedOnGoogle: boolean;
   signed: boolean;
   userOnAuth: UserType;
   handleGoogleSignIn: () => void;
   signOut: () => void;
}

interface AuthProviderProps {
   children: ReactNode;
}

const provider = new GoogleAuthProvider();

export const AuthenticationContext = createContext({} as AuthContextProps);

export const AuthenticationProvider = ({ children }: AuthProviderProps) => {
   const [userAuthGoogle, setUserAuthGoogle] = useState<any>(null);
   const [userOnAuth, setUserOnAuth] = useState<UserType>(null);

   const handleGoogleSignIn = (): void => {
      signInWithPopup(auth, provider)
         .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const users = result.user;
            setUserAuthGoogle(users);
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
            setUserAuthGoogle(sessionUser);
         }
      };

      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUserOnAuth(user);
      });

      unsubscribe();
      localStorageAuth();
   }, []);

   function signOut() {
      sessionStorage.clear();
      setUserAuthGoogle(null);
      setUserOnAuth(null);

      return <Navigate to="/" />;
   }

   return (
      <AuthenticationContext.Provider
         value={{
            signedOnGoogle: !!userAuthGoogle,
            signed: !!userOnAuth,
            userAuthGoogle,
            userOnAuth,
            handleGoogleSignIn,
            signOut,
         }}
      >
         {children}
      </AuthenticationContext.Provider>
   );
};

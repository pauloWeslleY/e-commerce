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
   userAuth: UserType;
   signed: any;
   userSigned: UserType | any;
   handleGoogleSignIn: () => void;
   signOut: () => void;
}

interface AuthProviderProps {
   children: ReactNode;
}

const provider = new GoogleAuthProvider();

export const AuthenticationContext = createContext({} as AuthContextProps);

export const AuthenticationProvider = ({ children }: AuthProviderProps) => {
   const [userAuth, setUserAuth] = useState<any>(null);
   const [userOnAuth, setUserOnAuth] = useState<UserType>(null);

   const handleGoogleSignIn = (): void => {
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

      const unsubscribe = onAuthStateChanged(auth, (user) => {
         // const username = user.;
         console.log("DATABASE ==>");
         setUserOnAuth(user);
      });

      unsubscribe();
      localStorageAuth();
   }, []);

   function signOut() {
      sessionStorage.clear();
      setUserAuth(null);
      setUserOnAuth(null);

      return <Navigate to="/" />;
   }

   return (
      <AuthenticationContext.Provider
         value={{
            signed: !!userAuth,
            userSigned: !!userOnAuth,
            userAuth,
            handleGoogleSignIn,
            signOut,
         }}
      >
         {children}
      </AuthenticationContext.Provider>
   );
};

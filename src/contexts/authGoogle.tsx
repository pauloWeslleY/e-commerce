import { ReactNode, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";

interface AuthContextProps {
   userAuth?: any;
   handleGoogleSignIn: () => void;
   signed: any;
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
            const user = result.user;
            setUserAuth(user);
            sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
         })
         .catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            const email = err.email;
            const credential = GoogleAuthProvider.credentialFromError(err);

            console.log(err);
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

   return (
      <AuthGoogleContext.Provider
         value={{ handleGoogleSignIn, signed: !!userAuth, userAuth }}
      >
         {children}
      </AuthGoogleContext.Provider>
   );
};

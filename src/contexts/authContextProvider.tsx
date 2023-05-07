import { ReactNode, createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithPopup,
   signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";

type UserProps = {
   id: string;
   username: string;
   email?: string;
   avatar?: string;
};

interface AuthContextProps {
   signedOnUser: boolean;
   userOnAuth: UserProps | null;
   handleSignInWithGoogle: () => Promise<void>;
   handleLogout: () => void;
}

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthenticationContext = createContext({} as AuthContextProps);

export const AuthenticationProvider = ({ children }: AuthProviderProps) => {
   const [userOnAuth, setUserOnAuth] = useState<UserProps | null>(null);

   const handleSignInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
         const { displayName, photoURL, uid } = result.user;
         if (!displayName || !photoURL) {
            throw new Error("Missing information form Google Account");
         }
         console.log("ID: ", uid);
      }
   };

   async function handleLogout() {
      try {
         await signOut(auth);
         setUserOnAuth(null);

         return <Navigate to="/" />;
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            setUserOnAuth({
               id: user.uid,
               username: user.displayName,
               email: user.email,
               avatar: user.photoURL,
            });
         } else {
            setUserOnAuth(null);
         }
      });

      return () => {
         unsubscribe();
      };
   }, []);

   return (
      <AuthenticationContext.Provider
         value={{
            signedOnUser: !!userOnAuth,
            userOnAuth,
            handleSignInWithGoogle,
            handleLogout,
         }}
      >
         {children}
      </AuthenticationContext.Provider>
   );
};

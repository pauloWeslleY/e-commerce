import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export class AuthService {
   getLoggedUser() {
      return new Promise((resolve) => {
         onAuthStateChanged(auth, (user: any) => {
            console.log(user);
            resolve(user);
         });
      });
   }

   async login(email: string, password: string) {
      await signInWithEmailAndPassword(auth, email, password)
         .then((user) => {
            console.log(user);
            return user;
         })
         .catch((err) => {
            console.log("error", err);
            return Promise.reject(err);
         });
   }
}

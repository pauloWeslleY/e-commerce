import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   useCreateUserWithEmailAndPassword,
   useIdToken,
} from "react-firebase-hooks/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { Flex, Stack, useToast, chakra } from "@chakra-ui/react";
import { auth, db } from "../../services/firebase";
import { InputPassword } from "../../components/InputPassword";
import { InputEmail } from "../../components/InputEmail";
import { HeroTitle } from "../../components/HeroTitle";
import { ButtonSign } from "../../components/Buttons";
import { useColors } from "../../hooks/useColors";
import { InputFooter } from "../../components/InputFooter";
import { InputUserName } from "../../components/InputUserName";
import { UserType } from "../../types/UsersType";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Loading } from "../../components/Loading";

export function Register() {
   const [username, setUsername] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [users, setUsers] = useState<UserType[]>([]);
   // const [isLoading, setIsLoading] = useState<boolean>(false);
   const [createUserWithEmailAndPassword] =
      useCreateUserWithEmailAndPassword(auth);
   const { THEME } = useColors();
   const navigate = useNavigate();
   const toast = useToast();
   const usersCollectionRef = collection(db, "users");
   const [user, loading] = useIdToken(auth);
   const useEmail = users.find(({ email }) => email === email);

   const handleRegisterUser = async (event?: FormEvent) => {
      event.preventDefault();
      // HACK: ==> Validação do campos do input Login e Senha!
      if (!email && password === "") {
         toast({
            title: "Preencha os campos",
            status: "error",
            duration: 9000,
            isClosable: true,
         });
      }
      if (email === "") {
         toast({
            title: "Digite seu e-mail!",
            status: "warning",
            duration: 9000,
            isClosable: true,
         });
      }
      if (password === "") {
         toast({
            title: "Digite sua senha!",
            status: "warning",
            duration: 9000,
            isClosable: true,
         });
      }

      // NOTE: Envie os dados do formulário caso ele for válido
      if (email === useEmail || email !== useEmail) {
         const newUser: UserType = { username, email, password };
         const docRef = await addDoc(usersCollectionRef, newUser);
         setUsers([...users, { id: docRef.id, ...newUser }]);
         await createUserWithEmailAndPassword(email, password)
            .then(() => {
               toast({
                  title: "Usuário Cadastrado!",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
               });
               navigate("/");
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;

               toast({
                  title: "Email já em uso",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
               });

               console.error(
                  `Error ao cria usuário ${errorCode} ${errorMessage}`
               );
            });
      } else {
         toast({
            title: "Usuário já cadastrado",
            status: "error",
            duration: 9000,
            isClosable: true,
         });
      }

      setEmail("");
      setPassword("");
      setUsername("");
   };

   useEffect(() => {
      async function getUsers() {
         const dataUser = await getDocs(usersCollectionRef);
         const users = dataUser.docs.map<UserType>((doc) => ({
            ...doc.data(),
            id: doc.id,
         }));
         setUsers(users);
      }
      getUsers();
   }, []);

   // if (user) {
   //    return (
   //       <div>
   //          <p>Registered User: {user.user.email}</p>
   //       </div>
   //    );
   // }

   if (loading) {
      return <Loading />;
   }

   return (
      <Flex
         minH={"100vh"}
         align={"center"}
         justify={"center"}
         bg={THEME.BACKGROUND}
      >
         <Stack spacing={8} mx={"auto"} p={18}>
            <Stack align={"center"}>
               <HeroTitle title="Cadastre-se" />
            </Stack>
            <Stack
               bg={THEME.SIGN_IN.BACKGROUND}
               rounded={"lg"}
               boxShadow={"lg"}
               p={10}
               justify={"center"}
               align={"center"}
            >
               <chakra.form onSubmit={handleRegisterUser}>
                  <Stack spacing={4}>
                     <InputUserName
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                        isRequired
                     />
                     <InputEmail
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        isRequired
                     />

                     <InputPassword
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        isRequired
                     />
                     <Stack spacing={10} pt={2}>
                        <ButtonSign
                           title="Cadastrar"
                           type="submit"
                           isLoading={loading}
                           loadingText="Cadastrando"
                           spinnerPlacement="start"
                        />
                     </Stack>
                     <InputFooter
                        label="Você já tem conta?"
                        link="Acesse ela aqui"
                        onClick={() => navigate("/")}
                     />
                  </Stack>
               </chakra.form>
            </Stack>
         </Stack>
      </Flex>
   );
}

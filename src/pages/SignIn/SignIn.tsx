import { FormEvent, useEffect, useState } from "react";
import { Flex, Stack, Text, useToast, chakra } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../../components/InputPassword";
import { InputEmail } from "../../components/InputEmail";
import { HeroTitle } from "../../components/HeroTitle";
import { ButtonSign } from "../../components/Buttons";
import { useColors } from "../../hooks/useColors";
import { InputFooter } from "../../components/InputFooter";
import { UserType } from "../../types/UsersType";
import { collection, getDocs } from "firebase/firestore";
import { useLoading } from "../../hooks/useLoading";
import { Loading } from "../../components/Loading";

export function SignIn() {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string | any>("");
   const [users, setUsers] = useState<UserType[]>([]);
   const { isLoading } = useLoading();
   const { THEME } = useColors();
   const navigate = useNavigate();
   const toast = useToast();
   const usersCollectionRef = collection(db, "users");

   const handleSignInUser = async (event: FormEvent) => {
      event.preventDefault();
      // NOTE: ==> Validação do campos do input
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
      const useEmail = users.some((user) => user.email === email);
      const usePass = users.some((user) => user.password === password);

      // TODO: Envie os dados do formulário caso ele for válido
      if (useEmail && !usePass) {
         toast({
            title: "Email e senha estão incorreto!",
            status: "error",
            duration: 9000,
            isClosable: true,
         });
      } else if (useEmail && usePass) {
         await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
               toast({
                  title: "Usuário Logado!",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
               });
               setEmail("");
               setPassword("");
               navigate("/dashboard");
            })
            .catch((err) => {
               toast({
                  title: "Email e senha estão incorreto!",
                  status: "warning",
                  duration: 9000,
                  isClosable: true,
               });
               console.error(err);
            });
      } else {
         toast({
            title: "Usuário não cadastrado",
            status: "error",
            duration: 9000,
            isClosable: true,
         });
      }

      setEmail("");
      setPassword("");
   };

   useEffect(() => {
      async function getUsers() {
         const dataUser = await getDocs(usersCollectionRef);
         const users = dataUser.docs.map<UserType>((doc) => ({
            ...doc.data(),
            uid: doc.id,
         }));
         setUsers(users);
      }
      getUsers();
   }, []);

   if (isLoading) {
      return <Loading />;
   }

   return (
      <Flex
         minH={"100vh"}
         align={"center"}
         justify={"center"}
         bg={THEME.BACKGROUND}
      >
         <Stack spacing={8} p={18}>
            <Stack align={"center"}>
               <HeroTitle title="System E-commerce" />

               <Text fontSize={"lg"} fontFamily={"Inter"} fontWeight={500}>
                  Digite suas informações de login
               </Text>
            </Stack>
            <Stack
               bg={THEME.SIGN_IN.BACKGROUND}
               rounded={"lg"}
               boxShadow={"lg"}
               p={10}
            >
               <chakra.form onSubmit={handleSignInUser}>
                  <Stack spacing={4}>
                     <InputEmail
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                     />

                     <InputPassword
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                     />

                     <Stack pt={2}>
                        <ButtonSign title="Entrar" type="submit" />
                     </Stack>
                  </Stack>
               </chakra.form>
               <InputFooter
                  label="Você não tem uma conta?"
                  link="Crie a sua conta aqui"
                  onClick={() => navigate("/register")}
               />
            </Stack>
         </Stack>
      </Flex>
   );
}

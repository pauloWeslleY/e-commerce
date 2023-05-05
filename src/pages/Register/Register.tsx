import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Flex, Stack, useToast, chakra, Image, Text } from "@chakra-ui/react";
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
import { useLoading } from "../../hooks/useLoading";
import Logotipo from "../../assets/logo.svg";

export function Register() {
   const [displayName, setDisplayName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [users, setUsers] = useState<UserType[]>([]);
   const { isLoading } = useLoading();
   const { THEME } = useColors();
   const navigate = useNavigate();
   const toast = useToast();
   const usersCollectionRef = collection(db, "users");

   const handleRegisterUser = async (event: FormEvent) => {
      event.preventDefault();
      // HACK: ==> Validação do campos do input Email e Senha!
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

      const emailAlreadyInUse = users.some(
         (user: UserType) => user.email == email
      );

      try {
         // NOTE: Envie os dados do formulário caso ele for válido
         if (!emailAlreadyInUse) {
            const newUser: UserType = { displayName, email, password };
            const docRef = await addDoc(usersCollectionRef, newUser);
            setUsers([...users, { uid: docRef.id, ...newUser }]);
            const { user } = await createUserWithEmailAndPassword(
               auth,
               email,
               password
            );

            await updateProfile(user, {
               displayName: displayName,
            });

            toast({
               title: "Usuário Cadastrado!",
               status: "success",
               duration: 9000,
               isClosable: true,
            });
            navigate("/");

            return user;
         } else {
            toast({
               title: "Usuário já cadastrado",
               status: "error",
               duration: 9000,
               isClosable: true,
            });
         }
      } catch (error) {
         toast({
            title: `Falha ao cadastrar usuário! ==> ${error.message}`,
            status: "error",
            duration: 9000,
            isClosable: true,
         });
      }

      setEmail("");
      setPassword("");
      setDisplayName("");
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
         as={"main"}
      >
         <Stack
            as={"section"}
            spacing={8}
            mx={"auto"}
            maxW={"lg"}
            py={12}
            px={6}
         >
            <Stack as={"header"} align={"center"}>
               <Image src={Logotipo} alt="" />
               <HeroTitle title="Cadastre-se" />

               <Text fontSize={"lg"} fontFamily={"Inter"} fontWeight={500}>
                  Crie sua conta agora
               </Text>
            </Stack>
            <Stack
               bg={THEME.SIGN_IN.BACKGROUND}
               rounded={"lg"}
               boxShadow={"lg"}
               justify={"center"}
               align={"center"}
               as={"section"}
               p={10}
            >
               <chakra.form onSubmit={handleRegisterUser}>
                  <Stack spacing={4}>
                     <InputUserName
                        onChange={(event) => setDisplayName(event.target.value)}
                        value={displayName}
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
                        <ButtonSign title="Cadastrar" type="submit" />
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

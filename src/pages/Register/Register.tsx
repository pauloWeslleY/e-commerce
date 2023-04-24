import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Flex, Stack, useToast } from "@chakra-ui/react";
import { auth } from "../../services/firebase";
import { InputPassword } from "../../components/InputPassword";
import { InputEmail } from "../../components/InputEmail";
import { HeroTitle } from "../../components/HeroTitle";
import { ButtonSign } from "../../components/Buttons";
import { useColors } from "../../hooks/useColors";
import { InputFooter } from "../../components/InputFooter";

export function Register() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [createUserWithEmailAndPassword, loading, error, user] =
      useCreateUserWithEmailAndPassword(auth);
   const navigate = useNavigate();
   const toast = useToast();
   const { THEME } = useColors();

   const handleRegisterUser = async (event: FormEvent) => {
      event.preventDefault();
      // fixme ==> Validação do campos do input Login e Senha!
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

      // TODO: Envie os dados do formulário caso ele for válido
      if (email && password !== "") {
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
            .catch((err) => {
               console.error(error);
               console.log(err);
            });
      } else if (user) {
         toast({
            title: "Usuário já cadastrado",
            status: "error",
            duration: 9000,
            isClosable: true,
         });
      }

      setEmail("");
      setPassword("");
   };

   if (loading) {
      return <p>carregando...</p>;
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
               bg={"gray.100"}
               rounded={"lg"}
               boxShadow={"lg"}
               p={10}
               justify={"center"}
               align={"center"}
            >
               <Stack spacing={4}>
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
                        onClick={handleRegisterUser}
                        isLoading={Boolean(loading)}
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
            </Stack>
         </Stack>
      </Flex>
   );
}

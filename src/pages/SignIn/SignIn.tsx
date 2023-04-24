import { FormEvent, useContext, useState } from "react";
import { Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { InputPassword } from "../../components/InputPassword";
import { InputEmail } from "../../components/InputEmail";
import { HeroTitle } from "../../components/HeroTitle";
import { ButtonSign } from "../../components/Buttons";
import { useColors } from "../../hooks/useColors";
import { InputFooter } from "../../components/InputFooter";
import ButtonSignInWithGoogle from "../../components/Buttons/ButtonSignInWithGoogle";
import { AuthGoogleContext } from "../../contexts/authGoogle";

export function SignIn() {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string | any>("");
   const [signInWithEmailAndPassword, loading, user] =
      useSignInWithEmailAndPassword(auth);
   const navigate = useNavigate();
   const toast = useToast();
   const { THEME } = useColors();
   const { handleGoogleSignIn, signed } = useContext(AuthGoogleContext);

   const handleSignInWithGoogle = async () => {
      await handleGoogleSignIn();
   };

   const handleSignInUser = async (event: FormEvent) => {
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

      console.log(password === "");
      // TODO: Envie os dados do formulário caso ele for válido
      if (email && password !== "") {
         await signInWithEmailAndPassword(email, password).then(() => {
            toast({
               title: "Usuário Logado!",
               status: "success",
               duration: 9000,
               isClosable: true,
            });
            setEmail("");
            setPassword("");
            navigate("/product");
         });
      } else if (user) {
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

   if (loading) {
      return <p>carregando...</p>;
   }

   if (!signed) {
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
                     />

                     <InputPassword
                        onChange={(event) => setPassword(event.target.value)}
                     />

                     <Stack spacing={5} pt={2}>
                        <ButtonSign title="Entrar" onClick={handleSignInUser} />
                        <ButtonSignInWithGoogle
                           title="Entrar com google"
                           onClick={handleSignInWithGoogle}
                        />
                     </Stack>
                  </Stack>
                  <InputFooter
                     label="Você não tem uma conta?"
                     link="Crie a sua conta aqui"
                     onClick={() => navigate("/register")}
                  />
               </Stack>
            </Stack>
         </Flex>
      );
   } else {
      return <Navigate to="/dashboard" />;
   }
}

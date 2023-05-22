import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Stack, Text, useToast, chakra, Image } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../../services/firebase'
import { InputPassword } from '../../components/Form/InputPassword'
import { InputFieldBar } from '../../components/Form/InputBar'
import { InputFooter } from '../../components/Form/InputFooter'
import { HeroTitle } from '../../components/HeroTitle'
import { ButtonSign } from '../../components/Buttons'
import { Loading } from '../../components/Loading'
import { UserType } from '../../types/UsersType'
import { useColors } from '../../hooks/useColors'
import { useLoading } from '../../hooks/useLoading'
import { EmailIcon } from '@chakra-ui/icons'
import Logotipo from '../../assets/logo.svg'

export function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string | any>('')
  const [users, setUsers] = useState<UserType[]>([])
  const { isLoading } = useLoading()
  const { THEME } = useColors()
  const navigate = useNavigate()
  const toast = useToast()
  const usersCollectionRef = collection(db, 'users')

  const handleSignInUser = async (event: FormEvent) => {
    event.preventDefault()
    const useEmail = users.some((user) => user.email === email)
    const usePass = users.some((user) => user.password === password)

    // TODO: Envie os dados do formulário caso ele for válido
    if (useEmail && !usePass) {
      toast({
        title: 'Email e senha estão incorreto!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (useEmail && usePass) {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast({
            title: 'Usuário Logado!',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setEmail('')
          setPassword('')
          navigate('/dashboard')
        })
        .catch((err) => {
          toast({
            title: 'Email e senha estão incorreto!',
            status: 'warning',
            duration: 9000,
            isClosable: true,
          })
          console.error(err)
        })
    } else {
      toast({
        title: 'Usuário não cadastrado',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    async function getUsers() {
      const dataUser = await getDocs(usersCollectionRef)
      const users = dataUser.docs.map<UserType>((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setUsers(users)
    }
    getUsers()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={THEME.BACKGROUND}
      as={'main'}
    >
      <Stack as={'section'} spacing={8} p={18}>
        <Stack as={'header'} align={'center'}>
          <Image src={Logotipo} alt="Logotipo" />
          <HeroTitle title="SystemStock" />

          <Text fontSize={'lg'} fontFamily={'Inter'} fontWeight={500}>
            Digite suas informações de login
          </Text>
        </Stack>
        <Stack
          bg={THEME.SIGN_IN.BACKGROUND}
          rounded={'lg'}
          boxShadow={'lg'}
          as={'section'}
          p={10}
        >
          <chakra.form onSubmit={handleSignInUser}>
            <Stack spacing={4}>
              <InputFieldBar
                title="Email"
                label="email"
                icon={<EmailIcon w={4} h={4} />}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <InputPassword
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <Stack pt={2}>
                <ButtonSign
                  title="Entrar"
                  type="submit"
                  isDisabled={email.length === 0}
                  isLoading={email.length === 0}
                  loadingText={email.length === 0 ? 'Entrar' : 'Carregando'}
                  spinnerPlacement={email.length === 0 ? null : 'start'}
                />
              </Stack>
            </Stack>
          </chakra.form>
          <InputFooter
            label="Você não tem uma conta?"
            link="Crie a sua conta aqui"
            onClick={() => navigate('/register')}
          />
        </Stack>
      </Stack>
    </Flex>
  )
}

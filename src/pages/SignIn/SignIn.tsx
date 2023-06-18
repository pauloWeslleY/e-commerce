import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Stack, Text, useToast, chakra, Image } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getDocs } from 'firebase/firestore'
import { auth } from '../../services/firebase'
import { InputPassword } from '../../components/Form/InputPassword'
import { InputFieldBar } from '../../components/Form/InputBar'
import { InputFooter } from '../../components/Form/InputFooter'
import { HeroTitle } from '../../components/HeroTitle'
import { ButtonSign } from '../../components/Buttons'
import { Loading } from '../../components/Loading'
import { UserType } from '../../types/UsersType'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useLoading } from '../../hooks/useLoading'
import { usersCollectionRef } from '../../services/collections'
import Logotipo from '../../assets/logotipo.svg'

export function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string | any>('')
  const [users, setUsers] = useState<UserType[]>([])
  const { isLoading } = useLoading()
  const { THEME } = useThemeColors()
  const navigate = useNavigate()
  const toast = useToast()

  const handleSignInUser = async (event: FormEvent) => {
    event.preventDefault()
    const useEmail = users.some(user => user.email === email)
    const usePass = users.some(user => user.password === password)

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
            title: 'Usuário autenticado!',
            description: `${email}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top',
          })
          setEmail('')
          setPassword('')
          navigate('/dashboard')
        })
        .catch(err => {
          toast({
            title: 'Email e senha estão incorreto!',
            description: `${err}`,
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

  const getUsers = async () => {
    const dataUser = await getDocs(usersCollectionRef)
    const users = dataUser.docs.map<UserType>(doc => ({
      ...doc.data(),
      id: doc.id,
    }))
    setUsers(users)
  }

  useEffect(() => {
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
      <Stack as={'section'} spacing={8} p={18} maxW={'2xl'}>
        <Stack as={'header'} align={'center'}>
          <Flex align={'center'} gap={3}>
            <Image src={Logotipo} alt="Logotipo" boxSize={16} />
            <HeroTitle title="SystemStock" color={'purple.600'} />
          </Flex>

          <Text
            fontSize={['md', 'xl']}
            fontFamily={'Inter'}
            fontWeight={'medium'}
          >
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
            <Stack spacing={4} w={['full', 'lg']}>
              <InputFieldBar
                title="E-mail"
                label="email"
                inputType="email"
                placeholder="Digite seu email..."
                icon={<EmailIcon w={4} h={4} />}
                value={email}
                onChange={event => setEmail(event.target.value)}
              />

              <InputPassword
                value={password}
                onChange={event => setPassword(event.target.value)}
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

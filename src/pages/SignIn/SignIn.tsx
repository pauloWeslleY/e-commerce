import { FormEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Stack, Text, Image, chakra, useToast } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { InputPassword } from '../../components/Form/InputPassword'
import { InputFieldBar } from '../../components/Form/InputBar'
import { InputFooter } from '../../components/Form/InputFooter'
import { HeroTitle } from '../../components/HeroTitle'
import { ButtonSign } from '../../components/Buttons'
// import { Loading } from '../../components/Loading'
import { useThemeColors } from '../../hooks/useThemeColors'
import { AuthenticationContext } from '../../contexts/authContextProvider'
import Logotipo from '../../assets/logotipo.svg'

export function SignIn() {
  const { email, password, setEmail, setPassword, handleSignInUser } =
    useContext(AuthenticationContext)
  const { THEME } = useThemeColors()
  const navigate = useNavigate()
  const toast = useToast()

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault()

    handleSignInUser()
    navigate('/dashboard')
    toast({
      title: 'Usuário autenticado!',
      description: `${email}`,
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top',
    })
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
          <chakra.form onSubmit={handleSignIn}>
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
                  isDisabled={password === ''}
                  isLoading={password === ''}
                  loadingText={password === '' ? 'Entrar' : 'Carregando'}
                  spinnerPlacement={password === '' ? null : 'start'}
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

import { FormEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Stack, Image, Text, chakra, useToast } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { RiUser3Fill } from 'react-icons/ri'
import { InputPassword } from '../../components/Form/InputPassword'
import { HeroTitle } from '../../components/HeroTitle'
import { ButtonSign } from '../../components/Buttons'
import { InputFooter } from '../../components/Form/InputFooter'
import { Loading } from '../../components/Loading'
import { InputFieldBar } from '../../components/Form/InputBar'
import { useThemeColors } from '../../hooks/useThemeColors'
import { AuthenticationContext } from '../../contexts/authContextProvider'
import Logotipo from '../../assets/logotipo.svg'

export const Register = () => {
  const {
    username,
    email,
    password,
    isLoading,
    setEmail,
    setUserName,
    setPassword,
    handleRegisterUser,
  } = useContext(AuthenticationContext)
  const { THEME } = useThemeColors()
  const navigate = useNavigate()
  const toast = useToast()

  const handleCreateUser = (event: FormEvent) => {
    event.preventDefault()

    handleRegisterUser()

    toast({
      title: 'Usuário cadastrado',
      description: 'Usuário cadastrado com sucesso',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  if (!isLoading) {
    return <Loading />
  }

  return (
    <Flex
      as={'main'}
      align={'center'}
      justify={'center'}
      minH={'100vh'}
      bg={THEME.BACKGROUND}
    >
      <Stack as={'section'} spacing={8} mx={'auto'} maxW={'2xl'} py={12} px={6}>
        <Stack as={'header'} align={'center'}>
          <Flex align={'center'} gap={3}>
            <Image src={Logotipo} alt="Logotipo" boxSize={16} />
            <HeroTitle title="Cadastre-se" color={'purple.600'} />
          </Flex>

          <Text fontSize={'xl'} fontFamily={'Inter'} fontWeight={'medium'}>
            Crie sua conta agora
          </Text>
        </Stack>
        <Stack
          as={'section'}
          bg={THEME.SIGN_IN.BACKGROUND}
          rounded={'lg'}
          boxShadow={'lg'}
          justify={'center'}
          align={'center'}
          p={10}
        >
          <chakra.form onSubmit={handleCreateUser}>
            <Stack spacing={4} w={['full', 'lg']}>
              <InputFieldBar
                title="Nome"
                label="username"
                inputType="text"
                icon={<RiUser3Fill />}
                placeholder="Digite seu nome..."
                value={username}
                onChange={event => setUserName(event.target.value)}
              />

              <InputFieldBar
                title="Email"
                label="email"
                inputType="email"
                placeholder="Digite seu email..."
                icon={<EmailIcon w={4} h={4} />}
                value={email}
                onChange={event => setEmail(event.target.value)}
              />

              <InputPassword
                onChange={event => setPassword(event.target.value)}
                value={password}
                isRequired
              />
              <Stack spacing={10} pt={2}>
                <ButtonSign
                  title="Cadastrar"
                  type="submit"
                  isDisabled={password === ''}
                  isLoading={password === ''}
                  loadingText={isLoading ? 'Entrar' : 'Carregando'}
                  spinnerPlacement={isLoading ? null : 'start'}
                />
              </Stack>
              <InputFooter
                label="Você já tem conta?"
                link="Acesse ela aqui"
                onClick={() => navigate('/')}
              />
            </Stack>
          </chakra.form>
        </Stack>
      </Stack>
    </Flex>
  )
}

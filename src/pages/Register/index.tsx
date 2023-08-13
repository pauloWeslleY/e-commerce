import { FormEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { RiUser3Fill } from 'react-icons/ri'
import { InputPassword } from '../../components/Form/InputPassword'
import { InputFooter } from '../../components/Form/InputFooter'
import { FormHeader } from '../../components/Form/FormHeader'
import { InputFieldBar } from '../../components/Form/InputBar'
import { WrapperForm } from '../../components/Form/WrapperForm'
import { FormContainer } from '../../components/Form/FormContainer'
import { ButtonSign } from '../../components/Buttons'
import { Loading } from '../../components/Loading'
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
  const navigate = useNavigate()

  const handleCreateUser = (event: FormEvent) => {
    event.preventDefault()

    handleRegisterUser()
    navigate('/')
  }

  if (!isLoading) {
    return <Loading />
  }

  return (
    <WrapperForm>
      <FormHeader
        logo={Logotipo}
        title="Cadastre-se"
        description="Crie sua conta agora"
      />
      <FormContainer onHandleSubmit={handleCreateUser}>
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
        />
        <Stack pt={2}>
          <ButtonSign
            title="Cadastrar"
            type="submit"
            isDisabled={password === ''}
            isLoading={password === ''}
            loadingText={isLoading ? 'Cadastrar' : 'Carregando'}
            spinnerPlacement={isLoading ? null : 'start'}
          />
        </Stack>
        <InputFooter
          label="Você já tem conta?"
          link="Acesse ela aqui"
          onClick={() => navigate('/')}
        />
      </FormContainer>
    </WrapperForm>
  )
}

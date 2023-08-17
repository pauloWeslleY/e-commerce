import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { InputPassword } from '../../components/Form/InputPassword'
import { InputFieldBar } from '../../components/Form/InputBar'
import { InputFooter } from '../../components/Form/InputFooter'
import { FormHeader } from '../../components/Form/FormHeader'
import { WrapperForm } from '../../components/Form/WrapperForm'
import { FormContainer } from '../../components/Form/FormContainer'
import { ButtonSign } from '../../components/Buttons'
import { useAuthentication } from '../../hooks/useAuthentication'
import Logotipo from '../../assets/logotipo.svg'

export const SignIn = () => {
  const {
    email,
    password,
    isLoading,
    setEmail,
    setPassword,
    handleSignInUser,
  } = useAuthentication()
  const navigate = useNavigate()

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault()
    handleSignInUser()
  }

  return (
    <WrapperForm>
      <FormHeader
        logo={Logotipo}
        title="SystemStock"
        description="Digite suas informações de login"
      />
      <FormContainer onHandleSubmit={handleSignIn}>
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
            loadingText={isLoading ? 'Carregando' : 'Entrar'}
            spinnerPlacement={isLoading ? 'start' : null}
          />
        </Stack>

        <InputFooter
          label="Você não tem uma conta?"
          link="Crie a sua conta aqui"
          onClick={() => navigate('/register')}
        />
      </FormContainer>
    </WrapperForm>
  )
}

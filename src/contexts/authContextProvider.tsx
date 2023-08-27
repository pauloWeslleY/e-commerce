import { ReactNode, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, db } from '../../firebase'
import { UserType } from '../types/UsersType'

type AuthContextProps = {
  signedOnUser: boolean
  userOnAuth: UserType | null
  username: string
  email: string
  password: string | any
  users: UserType
  isLoading: boolean
  isLoadingUser?: boolean
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setUserName: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<any>
  handleLogout: () => void
  handleSignInUser: () => Promise<void>
  handleRegisterUser: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthenticationContext = createContext({} as AuthContextProps)

export const AuthenticationProvider = ({ children }: AuthProviderProps) => {
  const [userOnAuth, setUserOnAuth] = useState<UserType | null>(null)
  const [username, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string | any>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)
  const [users, setUsers] = useState<UserType>()
  const toast = useToast()
  const navigate = useNavigate()

  /**
   * @author Weslley
   * função que armazena dados do usuário
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserOnAuth({
          id: user.uid,
          username: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      } else {
        setUserOnAuth(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const handleLoadingUser = async () => {
      const storageUser = JSON.parse(localStorage.getItem(':@user'))
      if (storageUser) {
        setUsers(storageUser)
        setIsLoadingUser(false)
      }
      setIsLoadingUser(false)
    }
    handleLoadingUser()
  }, [])

  /**
   * @author Weslley
   * função que criar um usuário no firebase
   */
  const handleRegisterUser = async () => {
    setIsLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async value => {
        setIsLoading(false)
        const user = value.user
        const userID = value.user.uid

        console.log(user)

        await updateProfile(user, {
          displayName: username,
        })
        await setDoc(doc(db, 'users', userID), {
          username,
          email: value.user.email,
          avatar: null,
        })
          .then(() => {
            const dataUser = {
              id: userID,
              username,
              email: value.user.email,
              avatar: null,
            }
            handleStorageUser(dataUser)
            setUsers(dataUser)
            navigate('/dashboard')
          })
          .catch(err => {
            toast({
              title: 'Falha ao cadastrado usuário',
              description: 'Não foi possível cadastrar usuário!',
              status: 'success',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            })
            console.error(err)
          })

        toast({
          title: 'Usuário cadastrado',
          description: 'Usuário cadastrado com sucesso',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        })
      })
      .catch(err => {
        setIsLoading(false)
        switch (err.code) {
          case 'auth/weak-password':
            toast({
              title: 'Senha muito fraca!',
              description: 'Senha precisa ter no mínimo 6 digito',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top-right',
            })
            break
          case 'auth/email-already-in-use':
            toast({
              title: 'Email já esta sendo utilizado!',
              description: 'Cadastre outro email',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top-right',
            })
            break
          case 'auth/invalid-email':
            toast({
              title: 'Email invalido!',
              description: 'Digite um email valido',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top-right',
            })
            break
          default:
            toast({
              title: 'Não foi possível cadastrar, tente mais tarde!',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top-right',
            })
            break
        }

        console.log(err)
      })
    setEmail('')
    setPassword('')
    setUserName('')
    setIsLoading(false)
  }

  /**
   * @author Weslley Lima
   * Função login de usuário
   */
  const handleSignInUser = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async value => {
        const userID = value.user.uid
        const docSnapshot = await getDoc(doc(db, 'users', userID))
        const displayName = docSnapshot.data().username

        const dataUser = {
          id: userID,
          username: displayName,
          email: value.user.email,
          avatar: null,
        }

        toast({
          title: 'Usuário autenticado!',
          description: `${displayName}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        })

        setEmail('')
        setPassword('')
        setUsers(dataUser)
        handleStorageUser(dataUser)
        setIsLoading(false)
        navigate('/dashboard')
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
            toast({
              title: 'Email não valido!',
              description: 'Digite um email valido',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            })
            break
          case 'auth/user-not-found':
            toast({
              title: 'Usuário não cadastrado',
              description: 'Cadastre um usuário',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            })
            break
          case 'auth/wrong-password':
            toast({
              title: 'Senha esta incorreta!',
              description: 'Digite uma senha valida',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            })
            break
          default:
            toast({
              title:
                'Não foi possível fazer login, tente novamente mais tarde!',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top-right',
            })
            break
        }

        console.log(err)
      })
  }

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        localStorage.removeItem(':@user')
        setUsers(null)
        setUserOnAuth(null)
        toast({
          title: 'Logout realizado com sucesso',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        })
      })
      .catch(err => {
        toast({
          title: 'Falha ao fazer logout',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        })
        console.log(err)
      })
  }

  const handleStorageUser = data => {
    localStorage.setItem(':@user', JSON.stringify(data))
  }

  return (
    <AuthenticationContext.Provider
      value={{
        signedOnUser: !!userOnAuth,
        userOnAuth,
        users,
        username,
        email,
        password,
        isLoading,
        isLoadingUser,
        setEmail,
        setPassword,
        setUserName,
        handleLogout,
        handleSignInUser,
        handleRegisterUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

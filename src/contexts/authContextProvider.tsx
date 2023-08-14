import { ReactNode, createContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, db } from '../services/firebase'
import { UserType } from '../types/UsersType'

type AuthContextProps = {
  signedOnUser: boolean
  userOnAuth: UserType | null
  username: string
  email: string
  password: string | any
  users: UserType
  isLoading: boolean
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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<UserType>()
  const toast = useToast()

  /**
   * @author Weslley
   * função que criar um usuário no firebase
   */
  const handleRegisterUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async value => {
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
            setUsers(dataUser)
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
            console.log(`Falha ao criar usuário ${err}`)
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
        switch (err.code) {
          case 'auth/weak-password':
            toast({
              title: 'Senha muito fraca!',
              description: 'Senha precisa ter no mínimo 6 digito',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            })
            return

          case 'auth/email-already-in-use':
            toast({
              title: 'Email já esta sendo utilizado!',
              description: 'Cadastre outro email',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            })
            return

          case 'auth/invalid-email':
            toast({
              title: 'Email não valido!',
              description: 'Digite um email valido',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            })
            return
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

        const dataUser = {
          id: userID,
          username: docSnapshot.data().username,
          email: value.user.email,
          avatar: null,
        }

        toast({
          title: 'Usuário autenticado!',
          description: `${email}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        })

        setEmail('')
        setPassword('')
        setUsers(dataUser)
        setIsLoading(false)
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
            return

          case 'auth/user-not-found':
            toast({
              title: 'Usuário não cadastrado',
              description: 'Cadastre um usuário',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            })
            return

          case 'auth/wrong-password':
            toast({
              title: 'Senha esta incorreta!',
              description: 'Digite uma senha valida',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            })
            return
        }

        console.log(err)
      })
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUserOnAuth(null)

      return <Navigate to="/" />
    } catch (err) {
      console.log(err)
    }
  }

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

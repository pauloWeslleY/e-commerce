import { useEffect, useState } from 'react'
import {
  User,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth'
import { auth } from '../services/firebase'

export function useLoggedUser() {
  const [isLoadingLoggedUser, setIsLoadingLoggedUser] = useState<boolean>(true)
  const [userAuth, setUserAuth] = useState(null as any)

  /**
   * @author WeslleyLima
   * @returns  Função que mantém o usuário na pagina caso ele esteja logado
   */
  const getLoggedUser = () => {
    return new Promise(resolve => {
      onAuthStateChanged(auth, (user: User) => {
        setPersistence(auth, browserSessionPersistence)
        resolve(user)
      })
    })
  }

  useEffect(() => {
    getLoggedUser()
      .then(user => {
        setUserAuth(user)
        setIsLoadingLoggedUser(false)
      })
      .catch(err => {
        console.log('ERRO ==> ', err)
        setIsLoadingLoggedUser(false)
      })
  }, [])

  return { userAuth, isLoadingLoggedUser }
}

import { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'

export function useAuthOnStatus() {
  const [userAuth, setUserAuth] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUserAuth(user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return { userAuth }
}

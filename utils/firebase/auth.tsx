import { useState, useEffect, useContext, createContext } from 'react'
import queryString from 'query-string'
import { auth, firestore } from 'utils'
import nookies from 'nookies'

const authContext = createContext({
  user: undefined,
  signin: undefined,
  signup: undefined,
  signout: undefined,
  sendPasswordResetEmail: undefined,
  confirmPasswordReset: undefined,
})

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then((response) => {
      setUser(response.user)
      return response.user
    })
  }

  const signup = (email, password, pseudo) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        firestore.collection('users').doc(response.user.uid).set({
          id: response.user.uid,
          email: email,
          img: null,
          pseudo: pseudo,
          coin: 50,
        })
        response.user.updateProfile({
          displayName: pseudo,
        })
        setUser(response.user)
        return response.user
      })
  }

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false)
      nookies.destroy(undefined, 'token')
    })
  }

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then(() => {
      return true
    })
  }

  const confirmPasswordReset = (password, code) => {
    const resetCode = code || getFromQueryString('oobCode')

    return auth.confirmPasswordReset(resetCode, password).then(() => {
      return true
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (user) {
        setUser(user)
        const token = await user.getIdToken()
        nookies.set(undefined, 'token', token, {
          //1jour
          maxAge: 24 * 60 * 60,
          path: '/',
        })
      } else {
        setUser(false)
        nookies.set(undefined, 'token', '', {})
      }
    })
  }, [])

  return {
    user: {
      id: user && user.uid,
      pseudo: user && user.displayName,
      email: user && user.email,
      img: user && user.photoURL,
    },
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  }
}

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key]
}

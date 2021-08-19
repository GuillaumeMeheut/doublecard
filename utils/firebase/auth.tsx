import { useState, useEffect, useContext, createContext } from 'react'
import queryString from 'query-string'
import { auth, firestore } from 'utils'

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
        console.log(response.user)
        firestore.collection('users').doc(response.user.uid).set({
          id: response.user.uid,
          email: email,
          profilImg: null,
          pseudo: pseudo,
          coin: 50,
        })
        response.user.updateProfile({
          displayName: pseudo,
        })
        console.log(response.user)
        setUser(response.user)
        return response.user
      })
  }

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false)
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    user: {
      id: user && user.uid,
      pseudo: user && user.displayName,
      email: user && user.email,
      photo: user && user.photoURL,
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

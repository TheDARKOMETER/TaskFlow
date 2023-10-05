import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, updatePassword, getIdToken } from 'firebase/auth'
import HttpService from '../services/http-service'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [userToken, setUserToken] = useState()
    const [loading, setLoading] = useState(true)
    const [actionType, setActionType] = useState('')
    const [http, setHttp] = useState()

    // TODO: Fix HttpService authToken

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setCurrentUser(userCredential.user)
            return userCredential.user
        }).then((user) => {
            getUserToken(user).then((token) => {
                setHttp(new HttpService(token))
                setActionType('signup')
            }).catch((err) => {
                throw err
            })
        }).catch((err) => {
            throw new Error(err.message.replace('Firebase: Error ', ''))
        })
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function updateDisplayName(username) {
        return updateProfile(auth.currentUser, {
            displayName: username
        }).catch((err) => {
            throw new Error(err.message.replace('Firebase: Error ', ''))
        })
    }

    function updatePasswordWrapper(newPassword) {
        return updatePassword(auth.currentUser, newPassword).catch((err) => {
            throw new Error(err.message.replace('Firebase: Error ', ''))
        })
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // userCredential.user.getIdToken().then((token) => console.log(token))  <-- Gets the token of the current user
            setCurrentUser(userCredential.user)
            console.log(currentUser)
            return userCredential.user
        }).then((user) => {
            getUserToken(user).then((token) => {
                setHttp(new HttpService(token))
                setActionType('signin')
            })
        }).catch((err) => {
            throw new Error(err.message.replace('Firebase: Error ', ''))
        })
    }

    useEffect(() => {
        if (http && actionType && currentUser) {
            switch (actionType) {
                case 'signin':
                    http.loginUser(currentUser.uid)
                    break
                case 'signup':
                    http.signUpUser(currentUser.uid)
                    break
                default:
                    return null
            }
        }
    }, [http, actionType, currentUser])

    function getUserToken(user) {
        return getIdToken(user).catch(err => {
            throw new Error(err.message.replace('Firebase: Error ', ''))
        })
    }

    function logout() {
        return signOut(auth).then(() => {
            setCurrentUser()
        }).catch((err) => {
            throw new Error(err.message.replace('Firebase: Error ', ''))
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            user && getUserToken(user).then(token => setUserToken(token))
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        logout,
        signin,
        resetPassword,
        updateDisplayName,
        updatePasswordWrapper,
        getUserToken,
        userToken
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

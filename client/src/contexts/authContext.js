import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, updatePassword, getIdToken } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setCurrentUser(userCredential.user)
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
        }).catch((err) => {
            throw new Error(err.message.replace('Firebase: Error ', ''))
        })
    }

    function getUserToken() {
        return getIdToken(auth.currentUser)
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
            setLoading(false)
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        const notifyChange = console.log(currentUser)

        return notifyChange
    }, [currentUser])

    const value = {
        currentUser,
        signup,
        logout,
        signin,
        resetPassword,
        updateDisplayName,
        updatePasswordWrapper,
        getUserToken
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

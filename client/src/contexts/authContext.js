import React, { useState, useEffect, useContext, Children } from 'react'
import { auth, createUserWithEmailAndPassword } from '../firebase'
// import { createUserWithEmailAndPassword } from 'firebase/auth'

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
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

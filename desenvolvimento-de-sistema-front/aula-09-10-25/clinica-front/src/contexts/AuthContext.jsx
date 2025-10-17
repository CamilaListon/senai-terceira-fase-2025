
import { createContext, useContext, useState, useEffect } from 'react'


const AuthContext = createContext()

export const Authprovider = ({ children }) => {
    const [user, setUser] = useState(" ")

    // se ja tiver email no localstorage, mantém login

    useEffect(() => {
        const savedEmail = localStorage.getItem("email")
        if (savedEmail) {
            setUser({ email: savedEmail })
        }
    }, [])

    const login = (email) => {
        localStorage.setItem("email", email)
        setUser({ email })
    }

    const logout = () => {
        localStorage.removeItem("email")
        setUser("")
    }

    return (
        <AuthContext Provider value={{ user, login, logout }}>
            {children}
        </AuthContext>

    )
}

export const useAuth = () => useContext(AuthContext)

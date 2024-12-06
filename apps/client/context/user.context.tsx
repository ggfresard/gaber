"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { UserDto } from "@shared/index"

const initialValue = {
    user: null,
    setUser: () => {},
    login: () => {},
    logout: () => {},
}

// Create the context
const UserContext = createContext<{
    user: UserDto | null
    setUser: (user: UserDto | null) => void
    login: (token: string) => void
    logout: () => void
}>(initialValue)

// Custom hook to access the context
export const useUser = () => useContext(UserContext)

// Provider component
import { ReactNode } from "react"

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDto | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (token) {
            try {
                const decodedUser = jwtDecode<UserDto & { exp: number }>(token)
                // Check if token is expired
                if (decodedUser.exp * 1000 > Date.now()) {
                    setUser(decodedUser)
                } else {
                    // Clear expired token
                    localStorage.removeItem("authToken")
                }
            } catch (err) {
                console.error("Invalid token:", err)
                localStorage.removeItem("authToken")
            }
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("authToken")
        setUser(null)
    }

    const login = (token: string) => {
        localStorage.setItem("authToken", token)
        const decodedUser = jwtDecode<UserDto>(token)
        setUser(decodedUser)
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

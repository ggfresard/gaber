"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user.context"

const Navbar = () => {
    const { user, logout } = useUser()
    const router = useRouter()

    const handleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`
    }

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 20px",
                background: "#333",
                color: "#fff",
            }}
        >
            <div>
                <h1 style={{ margin: 0 }}>My App</h1>
            </div>
            <div>
                {user ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <span>Welcome, {user.name}!</span>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: "5px 10px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        style={{
                            padding: "5px 10px",
                            background: "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar

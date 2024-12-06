"use client"
import { useUser } from "@/context/user.context"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const Callback = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const { login } = useUser()

    useEffect(() => {
        if (token) {
            try {
                // Use the login method from context
                login(token)
                router.push("/")
            } catch (err) {
                console.error("Error processing token:", err)
            }
        }
    }, [token, login, router])

    return <div>Processing login...</div>
}

export default Callback

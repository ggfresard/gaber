"use client"
import { useUser } from "@/context/user.context"
import React, { useEffect } from "react"

const Profile = () => {
    const { user } = useUser()

    if (!user) {
        return <p>Please log in to view your profile.</p>
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Your Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>GitHub ID: {user.githubId}</p>
        </div>
    )
}

export default Profile

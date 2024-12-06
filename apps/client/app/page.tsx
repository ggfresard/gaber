"use client"

import React from "react"

const Home = () => {
    const loginWithGithub = () => {
        // Redirect to the GitHub login endpoint in NestJS
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>GitHub Auth with NestJS</h1>
            <button
                onClick={loginWithGithub}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    background: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Login with GitHub
            </button>
        </div>
    )
}

export default Home

import React, { useState } from "react"
import "../css/login.css"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('email: ' + email + '\npassword: ' + password)
    }

    return <>
        <div className="loginForm formContainer">
           
            <form onSubmit={handleSubmit}>
            <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} for="email" placeholder="example@example.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} for="password" placeholder="password" id="password" name="password" />
                <button type="submit">Log in</button>
            </form>
            <a className="registerLink" href="/register">Don't have an account? Register here.</a>
        </div>
    </>

}
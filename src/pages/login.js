import React, { useState } from "react"

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
            <h4>Login</h4>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} for="email" placeholder="example@example.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} for="password" placeholder="password" id="password" name="password" />
                <button type="submit">Log in</button>
            </form>
            <button>Don't have an account? Register here.</button>
        </div>
    </>

}
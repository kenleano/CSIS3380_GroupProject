import React, { useState } from "react"

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [teamName, setTeamName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('email: ' + email + '\npassword: ' + password)
    }

    return <>
        <div className="register formContainer">
            <p>Register</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} for="email" placeholder="example@example.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} for="password" placeholder="password" id="password" name="password" />
                <label htmlFor="fullName">Full name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} for="fullName" placeholder="" id="fullName" name="fullName" />
                <label htmlFor="teamName">Full name</label>
                <input value={teamName} onChange={(e) => setTeamName(e.target.value)} for="teamName" placeholder="" id="teamName" name="teamName" />
                <button type="submit">Log in</button>
                <button>Already have an account? Login here.</button>
            </form>
        </div>
    </>
} 
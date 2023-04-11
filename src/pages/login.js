// import React, { useState } from "react"
// import "../css/login.css"

// export default function Login() {

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         alert('email: ' + email + '\npassword: ' + password)
//     }

//     return <>
//         <div className="loginForm formContainer">
           
//             <form onSubmit={handleSubmit}>
//             <h2>Login</h2>
//                 <label htmlFor="email">Email</label>
//                 <input value={email} onChange={(e) => setEmail(e.target.value)} for="email" placeholder="example@example.com" id="email" name="email" />
//                 <label htmlFor="password">Password</label>
//                 <input value={password} onChange={(e) => setPassword(e.target.value)} for="password" placeholder="password" id="password" name="password" />
//                 <button type="submit">Log in</button>
//             </form>
//             <a className="registerLink" href="/register">Don't have an account? Register here.</a>
//         </div>
//     </>

// }

import React, { useState } from "react";
import "../css/login.css";
import data from "../data/teams.json"; // Assuming the JSON data is stored in a file named teams.json in the same directory as login.js
import { Link, useMatch, useResolvedPath } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const team = data.teams.find(
      (team) => team.email === email && team.password === password
    );
    if (team) {
      alert("Login successful!"); // Replace with appropriate action, e.g. redirect to dashboard
    } else {
      alert("Invalid email or password"); // Replace with appropriate action, e.g. show error message
    }
  };

  return (
    <>
      <div className="loginForm formContainer">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            htmlFor="email"
            placeholder="example@example.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            htmlFor="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <button type="submit" className="loginBtn"><CustomLink to="/dashboard">Log in</CustomLink></button>
        </form>
        <a className="registerLink" href="/register">
          Don't have an account? Register here.
        </a>
      </div>
    </>
  );
}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to}>{children}</Link>
        </li>
    )
}

      

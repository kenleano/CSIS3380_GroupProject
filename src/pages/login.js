import React, { useState } from "react";
import "../css/login.css";
import axios from "axios"; // Import axios for making API requests
import { Link, useNavigate   } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make GET request to server to fetch teams data
      const response = await axios.get(process.env.BACKURL + "/user");
      const users = response.data;

      // Check if email and password match against teams data
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Successful login
        localStorage.clear();
        alert("Login successful!"); // Replace with appropriate action, e.g. redirect to dashboard
       
        localStorage.setItem("teamID", user.teamId);  // Save team ID to local storage
        console.log("teamID login", user.teamId)
        localStorage.setItem("isLoggedIn", "true"); // Save login status to local storage
     
        navigate("/dashboard"); 
        window.location.reload();
      } else {
        // Failed login
        setLoginError("Invalid email or password"); // Set error message
      }
    } catch (error) {
      // Error handling for API request
      console.error("Error fetching teams data:", error);
      setLoginError("Error logging in. Please try again."); // Set error message
    }
  };

  return (
    <>
      <div className="loginForm formContainer">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {loginError && <div>{loginError}</div>}
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
            type="password"
          />
          <button type="submit" className="loginBtn">
            Log in
          </button>
        </form>
        <Link className="registerLink" to="/register">
          Don't have an account? Register here.
        </Link>
      </div>
    </>
  );
}

import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";


export default function NavigationBar() {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  
    return (
      <nav className="navigationBar">
        <ul>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/newsletter">Newsletter</CustomLink>
          <CustomLink to="/results">Results</CustomLink>

            <CustomLink to="/teams">Teams</CustomLink>
          
       
        </ul>
        <ul>
        {isLoggedIn && (
            <CustomLink to="/dashboard">Dashboard</CustomLink>
          )} {/* Render only if user is logged in */}
          {!isLoggedIn && (
            <CustomLink to="/login">Login</CustomLink>
          )} {/* Render only if user is not logged in */}
          {!isLoggedIn && (
            <CustomLink to="/register">Register</CustomLink>
          )} {/* Render only if user is not logged in */}
        </ul>
      </nav>
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
import React from "react";
import NavigationBar from "./components/navigation_bar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.js"
import Newsletter from "./pages/newsletter.js"
import Results from "./pages/results.js"
import Teams from "./pages/teams.js"
import Login from "./pages/login.js"
import SignUp from "./pages/signup.js"

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/newsletter" element={<Newsletter />}></Route>
        <Route path="/results" element={<Results />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}

export default App;
import React, { useState } from "react"
// import axios from 'axios';

function otk(){

    let randNum = Math.floor(Math.random()*25);
    let key = String.fromCharCode(randNum+65);
    randNum = Math.floor(Math.random()*25);
    key += String.fromCharCode(randNum+97);
    randNum = Math.floor(Math.random()*100);
    key += "" + randNum;
    randNum = Math.floor(Math.random()*25);
    key += String.fromCharCode(randNum+97);
    randNum = Math.floor(Math.random()*25);
    key += String.fromCharCode(randNum+65);
    randNum = Math.floor(Math.random()*100);
    key += "" + randNum;

    return key;

}

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [teamName, setTeamName] = useState('')

    // const onSubmit = (e) => {
    //     e.preventDefault();

    //     const activityvar = { 
    //         user: email,
    //         password:password 
    //     };

    //     axios
    //     .get('http://localhost:5000/')
    //     .then((response) => {
            
    //         let l = 
    //         axios
    //         .post('http://localhost:5000/activity/user/add', activityvar)
    //         .then((res) => {
    //           window.location = '/';
    //         });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   };

    return <>
        <div className="register formContainer">
            <p>Register</p>
            {/* <form onSubmit={handleSubmit}> */}
            <form>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} for="email" placeholder="example@example.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} for="password" placeholder="password" id="password" name="password" />
                <label htmlFor="fullName">Full name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} for="fullName" placeholder="" id="fullName" name="fullName" />
                <label htmlFor="teamName">Full name</label>
                <input value={teamName} onChange={(e) => setTeamName(e.target.value)} for="teamName" placeholder="" id="teamName" name="teamName" />
                <button type="submit">Log in</button>
                <a className="register" href="/login">Already have an account? Login here.</a>
            </form>
        </div>
    </>
} 
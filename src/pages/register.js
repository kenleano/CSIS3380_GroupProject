import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import axios from 'axios';

export default function Register() {
    const [teamName, setteamName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [coachName, setcoachName] = useState('');
  

    const handleSubmit = (e) => {
        e.preventDefault();

        const activityvar = { 
            name: teamName, // Update to use fullName instead of email
            password: password,
            email: email, // Add email field
            coachName: coachName, // Add coachName field

        };

        axios
        .post(process.env.BACKURL + '/user/add', activityvar)
        .then((res) => {
            window.location = '/login';
        });

        
    };

    return (
        <>
            <div className="register formContainer">
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} htmlFor="email" placeholder="example@example.com" id="email" name="email" />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} htmlFor="password" placeholder="password" id="password" name="password" />
                    
                    <label htmlFor="fullName">Coach name</label>
                    <input value={coachName} onChange={(e) => setcoachName(e.target.value)} htmlFor="fullName" placeholder="Coach Name" id="fullName" name="fullName" />
                    
                    <label htmlFor="teamName">Team name</label>
                    <input value={teamName} onChange={(e) => setteamName(e.target.value)} htmlFor="teamName" placeholder="Team Name" id="teamName" name="teamName" />
                    <button type="submit" className="registerBtn">Register</button>
                    <a className="loginLink" href="/login">Already have an account? Login here.</a>
                </form>
            </div>
        </>
    );
}


// import React, { useState } from "react"
// import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import axios from 'axios';
// // import axios from 'axios';


// export default function Register() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [fullName, setFullName] = useState('')
//     const [teamName, setTeamName] = useState('')



//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const activityvar = { 
//             name: email,
//             password: password
//          };

//         axios
//         .post('http://localhost:5000/user/add', activityvar)
//         .then((res) => {
//             window.location = '/login';
//         });
//     };


//     // const onSubmit = (e) => {
//         // e.preventDefault();

//         // const activityvar = { 
//         //     user: email,
//         //     password:password 
//         // };

//         // axios
//         // .get('http://localhost:5000/')
//         // .then((response) => {
            
//         //     let l = 
//         //     axios
//         //     .post('http://localhost:5000/activity/user/add', activityvar)
//         //     .then((res) => {
//         //       window.location = '/';
//         //     });

//         // })
//         // .catch((error) => {
//         //   console.log(error);
//         // });


//     //   };

//     return <>
//         <div className="register formContainer">
           
//             <form onSubmit={handleSubmit}>
//             <h2>Register</h2>
//                 <label htmlFor="email">Email</label>
//                 <input value={email} onChange={(e) => setEmail(e.target.value)} for="email" placeholder="example@example.com" id="email" name="email" />
//                 <label htmlFor="password">Password</label>
//                 <input value={password} onChange={(e) => setPassword(e.target.value)} for="password" placeholder="password" id="password" name="password" />
//                 <label htmlFor="fullName">Full name</label>
//                 <input value={fullName} onChange={(e) => setFullName(e.target.value)} for="fullName" placeholder="" id="fullName" name="fullName" />
//                 <label htmlFor="teamName">Team name</label>
//                 <input value={teamName} onChange={(e) => setTeamName(e.target.value)} for="teamName" placeholder="" id="teamName" name="teamName" />
//                 <button type="submit" className="registerBtn">Register</button>
//                 <a className="loginLink" href="/login">Already have an account? Login here.</a>
//             </form>
//         </div>
//     </>
// } 


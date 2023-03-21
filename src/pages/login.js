import { useState } from "react"

export default function Login() {

    const [val, setVal] = useState("Hello There")
    const click = () => {
        alert(val)
    }

    const change = event => {
        setVal(event.target.value)
    }

    return <div className="newsletterRegistrationForm">
        <h1>Login</h1>
        <div>
            <input onChange={change} value = {val}/>
            <button onClick={click}>Submit</button>
        </div>
    </div>
}
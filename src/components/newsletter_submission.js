import { useState } from "react"

export default function NewsletterSubmission () {

    const [val, setVal] = useState("Hello There")
    const click = () => {
        alert(val)
    }

    const change = event => {
        setVal(event.target.value)
    }

    return <div className="newsletterRegistrationForm">
        <div>
            <h3>Enter your email here to get the lates news</h3>
            <input onChange={change} value = {val}/>
            <button onClick={click}>Submit</button>
        </div>
    </div>
}
import { useState } from "react"
import NewsletterSubmission from "../components/newsletter_submission"

export default function Home() {
    const [val, setVal] = useState("Hello There")
    const click = () => {
        alert(val)
    }

    const change = event => {
        setVal(event.target.value)
    }

    return (
        <div className="Container">
            <div className="homeScreenText">
                <h1><strong>Spike</strong> into</h1>
                <h1>the action</h1>
                <h2>Register for the ultimate volleyball tournment today!</h2>
            </div>
            <div className="content">
                <img src='assets\homescreen_image.jpg' alt=""></img>
            </div>
            <div className="newsletterRegistrationForm">
                <div>
                    <h3>Enter your email here to get the lates news</h3>
                    <input onChange={change} value={val} />
                    <button onClick={click}>Submit</button>
                </div>
            </div>
        </div>
    )
}
import { useState } from "react"

export default function NewsletterSubmission () {

    const [email, setEmail] = useState("Hello There")

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("Added to newsletter to " + email+"!");
    }

    return <div className="newsletterRegistrationForm">
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Enter your email here to get the latest news</label>                
                <input vaue={email} onChange={(e) => setEmail(e.target.value)} for="email" placeholder="Email@example.com" id="email" name="email" />
                <button className="loginBtn" type="submit">Get Newsletter</button>
            </form>
        </div>
    </div>
}
import { useState } from "react"

export default function NewsletterSubmission () {

    const [email, setEmail] = useState("Hello There")

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(email)
    }

    return <div className="newsletterRegistrationForm">
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Enter your email here to get the latest news</label>                
                <input value={email} onChange={(e) => setEmail(e.target.value)} for="email" placeholder="Email" id="email" name="email" />
                <button type="submit">Log in</button>
            </form>
        </div>
    </div>
}
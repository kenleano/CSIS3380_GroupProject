import React, { useState } from "react"
import NewsletterSubmission from "../components/newsletter_submission"
import Geo from "../components/geo"


export default function Home() {
    return (
        <>
            <div className="Container">
                <div className="homeScreenText">
                    <h1><strong>Spike</strong> into</h1>
                    <h1>the action</h1>
                    <h2>Register for the ultimate volleyball tournment today!</h2>
                </div>
                <div className="homeScreenContent">
                    <img src="..\assets\landing2.png" alt="" ></img>
                </div>
            </div>
            <NewsletterSubmission />
            <Geo />
        </>
    )
}
 




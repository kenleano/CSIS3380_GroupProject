import React from "react";
import "../data/geolocation"

export default function Geo() {
    return (
        <div className="geo">
            <h3>Find the team closest to you!</h3>
            <div className="teamContainer">
                <img src="../assets/logos/1.png" alt=""></img>
                <h2>Surrey Storm</h2>
                <h3>Surrey Avenue, Surrey/BC</h3>
                <h3>Accepting admissions!</h3>
                <button>Go to the team's page</button>
            </div>
        </div>
    )
}
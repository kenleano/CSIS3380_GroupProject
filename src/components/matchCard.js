import React from "react";


const matches = [
    {
    team1: "Team 1",
    team2: "Team 2",
    date: "Mar 4, 2023 - 3:00PM",
    address: "Elite Volleyball Club",
    },
    {
    team1: "Team 3",
    team2: "Team 4",
    date: "Mar 4, 2023 - 3:00PM",
    address: "Elite Volleyball Club",
    },
    {
    team1: "Team 5",
    team2: "Team 6",
    date: "Mar 4, 2023 - 3:00PM",
    address: "Elite Volleyball Club",
    },
    {  
    team1: "Team 7",
    team2: "Team 8",
    date: "Mar 4, 2023 - 3:00PM",
    address: "Elite Volleyball Club",
    }
]
export default function matchCard (props) {
    const matchcardcontainer = {
        // create grid of cards
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "20px",
        padding: "20px",
        margin: "20px",
        
    };
    const matchcard = {
    textAlign: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: "10px",
    padding: "10px",
    wordWrap: "break-word",
    display: "inline-block",
    };
    return (
        <div style={matchcardcontainer} id="match-container">
        <div style={matchcard} id="match-card">
            <br/>
            <br/>
            <h1 className="matchTitle">{props.team1} vs {props.team2}</h1>
            <p className="matchDate">Mar 4, 2023 - 3:00PM</p>
            <p className="address">Elite Volleyball Club</p>
            <button className="viewBtn">VIEW</button>
        </div>
        
        </div>
    );
}
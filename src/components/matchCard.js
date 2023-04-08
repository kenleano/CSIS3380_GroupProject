import React from "react";
import "../css/matchCard.css";

const teamNames = [
    "Beachcombers",
    "Cascade Avalanche",
    "Delta Coastal Selects",
    "Fraser Valley Volleyball Club",
    "North Shore Stars",
    "Phoenix Volleyball Club",
    "Riverside Volleyball Club",
    "Thunder Volleyball Club"
  ];
  
  const Matches = [
    {
      team1: teamNames[0],
      team2: teamNames[1],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[2],
      team2: teamNames[3],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[4],
      team2: teamNames[5],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[6],
      team2: teamNames[7],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[0],
      team2: teamNames[1],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[2],
      team2: teamNames[3],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[4],
      team2: teamNames[5],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[6],
      team2: teamNames[7],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[0],
      team2: teamNames[1],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[2],
      team2: teamNames[3],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[4],
      team2: teamNames[5],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    },
    {
      team1: teamNames[6],
      team2: teamNames[7],
      date: "Mar 4, 2023 - 3:00PM",
      address: "Elite Volleyball Club",
    }
  ];
  

function MatchCard(props) {

    return (
        <div className="matchcardcontainer">
          <div className="matchcard">
            <br />
            <br />
            <h2 className="matchTitle">{props.team1}</h2>
            <h2 className="versus">versus</h2>
            <h2 className="matchTitle">{props.team2}</h2>
            <p className="matchDate">{props.date}</p>
            <p className="address">{props.address}</p>
            {/* <button className="viewBtn">VIEW</button> */}
          </div>
        </div>
      );
      
}

function App() {
  const [matches] = React.useState(Matches);

  let matchArray = matches;
  let matchComponents = [];
  for (let i = 0; i < matchArray.length; i++) {
    let match = matchArray[i];
    matchComponents.push(
      <MatchCard
        team1={match.team1}
        team2={match.team2}
        date={match.date}
        address={match.address}
      />
    );
  }
  return <div className="matches-container" >{matchComponents}</div>;
}

export default App;

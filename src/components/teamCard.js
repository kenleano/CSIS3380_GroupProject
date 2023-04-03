import React from "react";
import "../css/teamCard.css";
import Teams from "../data/teams";

function TeamCard(props) {
  const { teamName, players } = props;
  return (
    <div className="teamcardcontainer">
      <div className="teamcard">
        <br />
        <br />
        <h2 className="team-name">{teamName}</h2>
        <p className="team-players">
          {players.map((player) => (
            <span>
              {player.name} ({player.position})
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [teams] = React.useState(Teams);

  let teamComponents = teams.map((team, index) => (
    <TeamCard
      key={index}
      teamName={Object.keys(team)[0]}
      players={Object.values(team)[0]}
    />
  ));
  return <div className="team-container">{teamComponents}</div>;
}

export default App;

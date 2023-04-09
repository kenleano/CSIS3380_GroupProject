import "../css/dashboard.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import playerTable  from "../data/playerTable.json";
import teamTable from "../data/teamTable.json";
import gamesTable from "../data/gameTable.json";

//The value of the teamID variable is the ID of the team you want to display
//Create a global variable that saves the teamID of the team that logins
//Then use that variable to display the team's information
const teamID = 1;

function Team() {
    const [teams] = React.useState(teamTable.teams);
    console.log("TEAMS:", playerTable.teams);
    const team = teams.find((team) => team.id === teamID);
    return (
      <div className="dashboardTeam">
           <img src={team.logo} alt={`${team.name} logo`} />
        <h2>{team.name}</h2>
        <p>{team.description}</p>
        <p>Location: {team.location}</p>
        <p>Days: {team.days}</p>
        <p>GeoTag: {team.geoTag}</p>
     
        <p>
          Coach: {team.coachName} ({team.coachInfo})
        </p>
        <p>Email: {team.email}</p>
        <p>Open: {team.open}</p>
      </div>
    );
  }
  

function Players() {
  
  const [players] = React.useState(playerTable.players);
  const playerFiltered = players.filter((players) => players.teamID === teamID);
console.log("PLAYERS FILTERED:", playerFiltered);  
  return (
    <div className="dashboardPlayers">
          <h1>Players:</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Date of Birth</th>
            <th>Contact</th>
            <th>Injuries</th>
            <th>Active</th>
            <th>Medical</th>
          </tr>
        </thead>
      
        <tbody>
          {playerFiltered.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.DOB}</td>
              <td>{player.contact}</td>
              <td>{player.injuries}</td>
              <td>{player.active}</td>
              <td>{player.medical}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



function GamesTable() {
  const [games] = React.useState(gamesTable.games);
  const [teams] = React.useState(teamTable.teams);
  function getTeamName(teamID) {
    const team = teams.find((team) => team.id === teamID);
    return team.name;
  }
  return (
    <div className="dashboardGames">
    <h1>Games:</h1>
    <table >
       
      <thead>
        <tr>
          <th>ID</th>
          <th>Team 1</th>
          <th>Team 2</th>
          <th>Date</th>
          <th>Location</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
          <tr key={game.id}>
            <td>{game.id}</td>
            <td>{getTeamName(game.id1)}</td>
            <td>{getTeamName(game.id2)}</td>
            <td>{game.date}</td>
            <td>{game.location}</td>
            <td>{game.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function App() {
 
    return (

      <div className="dashboardContainer">
        <div className="dashboard">
          
            <Team />
          <Players />
          <br/>
          <GamesTable/>

        </div>
      </div>
    );
  }
  
  
  export default App;
 
  
  
  
  
  

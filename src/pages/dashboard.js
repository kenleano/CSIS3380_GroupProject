import "../css/dashboard.css";

import React, { useEffect, useState } from "react";

import teamTable from "../data/teamTable.json";
import gamesTable from "../data/gameTable.json";

import { Link, useNavigate , } from "react-router-dom";
import axios from "axios";


const teamID = Number(localStorage.getItem("teamID"));
console.log("teamID DASHBOARD", teamID);

function Team() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/team/")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  const team = teams.find((team) => team.id === Number(teamID));

  // Add null check for team object
  if (!team) {
    return <div>Loading...</div>;
  }
  console.log("TEAMS test:", team);


  return (
    <div className="dashboardTeam">
      <table>
        <th>
          <img src={team.logo} alt="logo" />
        </th>
        <th>
          <h2>{team.teamName}</h2>
        </th>
      </table>
      <tr>{team.description}</tr>
      <tr>Location: {team.location}</tr>
      <tr>Days: {team.days}</tr>
      <tr>GeoTag: {team.geoTag}</tr>
      <tr>
        Coach: {team.coachName} {team.coachInfo}
      </tr>
      <tr>Email: {team.email}</tr>
      <tr>Open: {team.open}</tr>
      <br />
      <br />
      <button className="editProfileBtn">Edit Profile</button>
      <br />
    </div>
  );
}

function Players() {

  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    teamId: teamID,
    name: "",
    position: "",
    DOB: "",  
    contact: "",
    injuries: "",
    active: true,
    medical: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };
  const handleDeletePlayer = (id) => {
    axios
      .delete(`http://localhost:5000/player/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        // Assuming successful deletion, update local state by filtering out the deleted player
        setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== id));
        // ... other actions or state updates after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    const activityvar = { ...newPlayer };
    axios
      .post("http://localhost:5000/player/add", activityvar)
      .then((res) => {
        setPlayers([...players, newPlayer]);
        setNewPlayer({
          id:"",
          teamId: teamID,
          name: "",
          position: "",
          DOB: "",
          contact: "",
          injuries: "",
          active: true,
          medical: ""
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/player/")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const teamPlayers = players.filter((player) =>player.teamId===Number(teamID));

  console.log(teamPlayers);
  if (!teamPlayers) {
    return <div>Loading...</div>;
  }
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
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {teamPlayers.map((player) => (
        <tr key={player.id}>
          <td>{player.name}</td>
          <td>{player.position}</td>
          <td>{player.DOB}</td>
          <td>{player.contact}</td>
          <td>{player.injuries}</td>
          <td>{player.active.toString()}</td>
          <td>{player.medical}</td>
          <td>
            {/* <button>Edit</button> */}
            <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
          </td>
        </tr>
      ))}
      <tr>
        <td>
          <input
            placeholder="Name"
            name="name"
            value={newPlayer.name}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            placeholder="Position"
            name="position"
            value={newPlayer.position}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            type="date"
            placeholder="Date of Birth"
            name="DOB"
            value={newPlayer.DOB}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            placeholder="Contact info"
            name="contact"
            value={newPlayer.contact}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            placeholder="Injuries"
            name="injuries"
            value={newPlayer.injuries}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            type="checkbox"
            name="active"
            checked={newPlayer.active}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            placeholder="Medical"
            name="medical"
            value={newPlayer.medical}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <button className="addPlayerBtn" onClick={handleAddPlayer}>
            Add Player
          </button>
        </td>
      </tr>
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
      <table>
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
      <br />
   
    </div>
  );
}



function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  useEffect(() => {
    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "isLoggedIn") {
        setIsLoggedIn(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear("teamID");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="dashboardContainer">
      <div className="dashboard">
        {/* Render components based on isLoggedIn state */}
        {isLoggedIn ? (
          <div>
            {/* Render logged-in components */}
            <Team />
            <Players />
            <br />
            <GamesTable />
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
            <br />
            <br />
          </div>
        ) : (
          <div>
            {/* Render logged-out components */}
          </div>
        )}
      </div>
    </div>
  );
}


export default App;

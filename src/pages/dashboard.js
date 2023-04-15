import "../css/dashboard.css";

import React, { useEffect, useState } from "react";
// import axios from "axios";
import playerTable from "../data/playerTable.json";
import teamTable from "../data/teamTable.json";
import gamesTable from "../data/gameTable.json";
import axios from "axios";

const teamID = localStorage.getItem("teamID");
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

  console.log("TEAMS test:", teams);

  const team = teams.find((team) => team.id === Number(teamID));

  // Add null check for team object
  if (!team) {
    return <div>Loading...</div>;
  }

  const firstLetter = team.teamName.charAt(0).toUpperCase();
  const imageNum = firstLetter.charCodeAt(0) - 64;

  return (
    <div className="dashboardTeam">
      <table>
        <th>
          <img src={`assets/logos/${imageNum}.png`} alt="logo" />
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
    teamID: teamID,
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
          teamID: teamID,
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

  const teamPlayers = players.filter((player) =>player.teamID===Number(teamID));

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
            <button>Edit</button>
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

function Players2() {
  const [players, setPlayers] = React.useState(playerTable.players);
  const playerFiltered = players.filter((players) => players.teamID === teamID);

  const handleDeletePlayer = (playerID) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== playerID)
    );
  };

  const [editingPlayer, setEditingPlayer] = React.useState(null);

  const handleEditPlayer = (playerID, updatedPlayer) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id === playerID) {
          return { ...player, ...updatedPlayer };
        } else {
          return player;
        }
      })
    );
    setEditingPlayer(null);
  };
  const handleAddPlayer = (newPlayer) => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

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
            {/* <th>Active</th> */}
            <th>Medical</th>
            <th>Actions</th>
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
              {/* <td>{player.active}</td> */}
              <td>{player.medical}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDeletePlayer(player.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <input type="text"></input>
            </td>
            <button className="addPlayerBtn" onClick={() => handleAddPlayer()}>
              Add Player
            </button>
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
      <button className="logoutBtn">Logout</button>
    </div>
  );
}

function App() {
  return (
    <div className="dashboardContainer">
      <div className="dashboard">
        <Team />
        <Players />
        <br />
        <GamesTable />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <br />
      </div>
    </div>
  );
}

export default App;

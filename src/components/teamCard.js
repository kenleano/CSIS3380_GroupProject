import React, { useState, useEffect } from "react";
import "../css/teamCard.css";
import Teams from "../data/teams";
import axios from "axios";




function TeamCard2() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/team/");
        setTeams(response.data);
        console.log("TEAMS:", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("TEAMS ARRAY:", teams);
  return (
    <div className="teamcardcontainer">
      {teams.map((team) => (
        <div className="teamcard" key={team.id}>
          <button className="team-name">{team.teamName}</button>
          <div className="team-players">
            <label className="playerName"> {team.location} </label>
            <label className="playerName"> {team.days} </label>
            <label className="playerName"> {team.email} </label>
            <label className="playerName"> {team.coachName} </label>
          </div>
        </div>
      ))}
    </div>
  );
}


function App() {
  //Uses teams from data/teams.js
  const [teams] = React.useState(Teams);

  //Creates a list of team components loaded from data/teams.js
  //The key is the index of the team in the array
  let teamComponents = teams.map((team, index) => (
    <TeamCard
      key={index}
      teamName={Object.keys(team)[0]}
      players={Object.values(team)[0]}
    />
  ));
  return <div className="team-container">{teamComponents}</div>;
}

function SearchBar(props) {
  const [teams] = React.useState(Teams);

  const filterTeams = (teams, searchText) => {
    return teams.filter((team) =>
      team.teamName.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredTeams = filterTeams(teams, searchInput);

  const teamComponents = filteredTeams.map((team, index) => (
    <TeamCard
      key={index}
      teamName={team.teamName}
      players={team.players}
    />
  ));
  
  return (
    <div className="app-wrapper">
      <br />
      <br />
      <div className="search-container">
        <h2>Search for a team</h2>
        <input
          className="searchbar"
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search for a team"
        />
      </div>
      <div className="team-container">{teamComponents}</div>
    </div>
  );
}

function TeamCard({ team }) {
  return (
    <div className="teamcardcontainer">
      <div className="teamcard" key={team.id}>
        <img className="teamLogo" src={team.logo} alt="logo" />
        <button className="team-name">{team.teamName}</button>
        <div className="team-players">
        <tr className="playerName"> {team.coachName} </tr>
        <tr className="playerPosition"> Coach </tr>
          <tr className="playerName"> {team.location} </tr>
          <tr className="playerName"> {team.days} </tr>
          <tr className="playerName"> {team.email} </tr>
        
        </div>
      </div>
    </div>
  );
}

function SearchBar2() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/team/");
        setTeams(response.data);
        console.log("TEAMS:", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const teamComponents = filteredTeams.map((team) => (
    <TeamCard key={team.id} team={team} />
  ));

  return (
    <div className="app-wrapper">
      <br />
      <br />
      <div className="search-container">
        <h2>Search for a team</h2>
        <input
          className="searchbar"
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search for a team"
        />
      </div>
      <div className="team-container">{teamComponents}</div>
    </div>
  );
}
export default SearchBar2;

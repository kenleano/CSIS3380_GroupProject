import React, { useState, useEffect } from "react";
import "../css/teamCard.css";
import axios from "axios";







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

function SearchBar() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKURL + "/team/");
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
export default SearchBar;

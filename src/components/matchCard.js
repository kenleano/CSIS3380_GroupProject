
import "../css/matchCard.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

function MatchCard() {
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.RENDER_V + "/team/")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.RENDER_V + "/game/")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getTeamName = (teamID) => {
    const team = teams.find((team) => team.id === teamID);

    if (!team || !team.teamName || team.teamName.trim() === "") {
      return team && team.name ? team.name : "TBD";
    } else {
      return team.teamName;
    }
  }


  console.log("GAMES length:", games.length);


  return (
    <div className="matches-container">
      {games.map((game) => (
        <div className="matchcard" key={game.id}>
          <h2 className="matchTitle">{getTeamName(game.id1)}</h2>
          <p className="versus">versus</p>
          <h2 className="matchTitle">{getTeamName(game.id2)}</h2>
          <p className="matchDate">{game.date}</p>
          <p className="address">{game.location}</p>
          <button className="winner">RESULT: {game.result}</button>
        </div>
      ))}
    </div>
  );
}

function SearchBar() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.RENDER_V + "/team/");
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
    <MatchCard key={team.id} team={team} />
  ));

  console.log("TEAM COMPONENT LENGTH: " + teamComponents.length);
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
      <div className="team-container">
        {teamComponents.length > 0 ? (
          teamComponents
        ) : (
          <p>No teams found</p>
        )}
      </div>
    </div>
  );
}

export default function Results() {
  return (
    <div className="container">
      <br/>
      <br/>
      <br/>
      <MatchCard />
    </div>
  );
}








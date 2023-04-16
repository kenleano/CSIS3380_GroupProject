import React, { useState, useEffect } from "react";
import "../css/teamCard.css";
import axios from 'axios';


function TeamCard({ team }) {
  return (
    <div className="teamcardcontainer">
      <div className="teamcard" key={team.id}>
        <img className="teamLogo" src={team.logo} alt="logo" />
        <br/>
        <br/>
        <br/>
        <button className="team-name">{team.name}</button>
      </div>
    </div>
  );
}

function SearchBar2() {
  const [teams, setTeams] = useState([]);
  const [country, setCountry] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  const handleCountrySubmit = e => {
    e.preventDefault();
    setCountry(e.target.value)
    fetchData();
  }
  const fetchData = async () => {

    var config = {
      method: 'get',
      url: 'https://v1.volleyball.api-sports.io/teams?country=' + country,
      headers: {
        'x-rapidapi-key': '292e2c6698106b2ff4ce95f138207ee2',
        'x-rapidapi-host': 'v1.volleyball.api-sports.io'
      }
    };
    var url = 'https://v1.volleyball.api-sports.io/teams?country=' + country;
    console.log(country);

    try {
      const response = await axios.get(url, config);
      setTeams(response.data.response);
      console.log("TEAMS:", response.data.response);
    } catch (error) {

      console.log(error);
    }
    
  };
   
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchInput.toLowerCase())
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
          defaultValue={country}
          onChange={handleCountryChange}
          placeholder="Search for a Country"
        /><button type="button" onClick={handleCountrySubmit}>Submit</button>
        <br/>
        <br/> 
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

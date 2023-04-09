import React, { useState } from "react";
import "../css/teamCard.css";
import Teams from "../data/teams";

// function TeamCard(props) {
//   const { teamName, players } = props;
//   return (
//     <div className="teamcardcontainer">
//       <div className="teamcard">
//         <br />
//         <br />
//         <h2 className="team-name">{teamName}</h2>
//         <p className="team-players">
//           {players.map((player) => (
//             <span>
//               {player.name} ({player.position})
//               <br />
//             </span>
//           ))}
//         </p>
//       </div>
//     </div>
//   );
// }




// function App() {
//   const [teams] = useState(Teams);
//   const [searchInput, setSearchInput] = useState("");

//   const handleSearchInputChange = (event) => {
//     setSearchInput(event.target.value);
//   };

//   const filterTeams = (teams, searchText) => {
//     return teams.filter((team) =>
//       Object.keys(team)[0].toLowerCase().includes(searchText.toLowerCase())
//     );
//   };

//   const filteredTeams = filterTeams(teams, searchInput);

//   const teamComponents = filteredTeams.map((team, index) => (
//     <TeamCard
//       key={index}
//       teamName={Object.keys(team)[0]}
//       players={Object.values(team)[0]}
//     />
//   ));

//   return (
//     <div className="team-container">
//       <input
//         type="text"
//         value={searchInput}
//         onChange={handleSearchInputChange}
//         placeholder="Search for a team"
//       />
//       {teamComponents}
//     </div>
//   );
// }

// export default App;


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
      Object.keys(team)[0].toLowerCase().includes(searchText.toLowerCase())
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
      teamName={Object.keys(team)[0]}
      players={Object.values(team)[0]}
    />
  ));

  return (
    <div className="app-wrapper">
      <br/>
      <br/>
         <div className="search-container">
          <h2>Search for a team</h2>
        <input className="searchbar"
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search for a team"
        />
      </div>
      <div className="team-container">
        {teamComponents}</div>
    </div>
  );
}


export default SearchBar;
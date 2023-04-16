import TeamCard from "../components/worldCard.js";
import React, { useState } from "react";

export default function World() {





  
  return (
    <>
      <div className="container" style={{ height: "100vh", overflowY: "auto" }}>
        <TeamCard />
      </div>
      <div className="homeScreenContent">
        <img src="assets\landing2.png" alt=""></img>
      </div>
    </>
  );
}

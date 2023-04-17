import React, { useState, useEffect } from "react";
import "../data/geolocation"
import axios from "axios";

export default function Geo() {
    const [closestTeam, setClosest] = useState([]);
    const [openFP, setOpen] = useState([]);
    const [coach, setCoach] = useState([]);
    const [coachInfo, setCoachI] = useState([]);
    function distance(latitude1, longitude1, latitude2, longitude2){

        var pi = Math.PI;
    
        var rad_lat1 = latitude1 * pi / 180;
        var rad_lat2 = latitude2 * pi / 180;
        var rad_lon1 = longitude1 * pi / 180;
        var rad_lon2 = longitude2 * pi / 180;
    
        var delta_latitude = rad_lat2 - rad_lat1;
        var delta_longitude = rad_lon2 - rad_lon1;
    
        var a = Math.pow(Math.sin(delta_latitude/2),2) +
        Math.cos(rad_lat1) * Math.cos(rad_lat2) *
        Math.pow(Math.sin(delta_longitude/2),2);
    
        return Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    function dLoop(teams, coords){
        var ID = 0;
        var dMin = 99;
        teams.forEach(team=>{
            var lat1 = parseFloat(team.geotag[0].$numberDecimal);
            var lon1 = parseFloat(team.geotag[1].$numberDecimal);
            var d = distance(lat1, lon1, coords.latitude, coords.longitude);
            if (d<dMin){
                dMin = d;
                ID = team.id; 
            }
        })
        return ID;
    }

    useEffect(() => {       
        const fetchData = async () => {
            console.log(process.env.BACKURL)
            try {
            const response = await axios.get(process.env.BACKURL + "/team/");
            const crd =  await getPosition();
            const ID = dLoop(response.data, crd.coords);

            const closest = response.data.find((team) => team.id === ID);
            console.log(closest);
            setClosest(closest);

            if(closest.open){
                setOpen("ACCEPTING NEW PLAYERS");
                setCoach("Coach: " + closest.coachName);
                setCoachI("Contact: " + closest.coachInfo);
            }            
            } catch (error) {
            console.log(error);
            }
        };
        fetchData();
    }, []);

    if (!closestTeam) {
        return <div>Loading...</div>;
    }

    return (
        
        <div className="geo">
            <h3>Find the team closest to you!</h3>
            <div className="teamContainer">
                <img src={closestTeam.logo} alt=""></img>
                <h2>{closestTeam.teamName}</h2>
                <h3>{closestTeam.location}</h3>
                <h3>{openFP}</h3>
                <h3>{coach}</h3>
                <h3>{coachInfo}</h3>
            </div>
        </div>
    )
}

function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}
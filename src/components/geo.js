import React, { useState, useEffect } from "react";
import "../data/geolocation"
import axios from "axios";

export default function Geo() {
    //variable to be called on the page
    const [closestTeam, setClosest] = useState([]);
    const [openFP, setOpen] = useState([]);
    const [coach, setCoach] = useState([]);
    const [coachInfo, setCoachI] = useState([]);

    //function that returns the relative surface distance between two coordinates on a sphere
    function distance(latitude1, longitude1, latitude2, longitude2) {

        var pi = Math.PI;

        var rad_lat1 = latitude1 * pi / 180;
        var rad_lat2 = latitude2 * pi / 180;
        var rad_lon1 = longitude1 * pi / 180;
        var rad_lon2 = longitude2 * pi / 180;

        var delta_latitude = rad_lat2 - rad_lat1;
        var delta_longitude = rad_lon2 - rad_lon1;

        var a = Math.pow(Math.sin(delta_latitude / 2), 2) +
            Math.cos(rad_lat1) * Math.cos(rad_lat2) *
            Math.pow(Math.sin(delta_longitude / 2), 2);

        return Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    //this function get the collection of team and the local coordinate and return the ID of the team closest to that coordinate
    function dLoop(teams, coords) {
        var ID = 0;
        var dMin = 99; //distance placeholder. The biggest number that could be compared two is 3.14

        teams.forEach(team => {
            console.log("Team id: " + team.id)
            console.log(team.geotag.length)
            console.log("Team.geotag: " + team.geotag == null)
            console.log(team.geotag[0])
            console.log("Team.geotag:[0]: " + team.geotag[0] == null)
            console.log(team.geotag[0].$numberDecimal)
            console.log("team.geotag[0].$numberDecimal: " + team.geotag[0].$numberDecimal == null)
            consolo.log("=========================================================")
            if (!team.geotag) {
                var lat1 = parseFloat(team.geotag[0].$numberDecimal); //get team latitude
                var lon1 = parseFloat(team.geotag[1].$numberDecimal); //get team longitude
                var d = distance(lat1, lon1, coords.latitude, coords.longitude); //send parameters do formula
                if (d < dMin) { //saves the distance if smaller the the previous one.
                    dMin = d;
                    ID = team.id;
                }
            }
        })
        return ID; //return id
    }

    useEffect(() => {        //request a route as the page loads. 
        const fetchData = async () => {

            console.log(process.env.REACT_APP_BACKURL)
            try {
                console.log(process.env.REACT_APP_BACKURL + "/team/")
                const response = await axios.get(process.env.REACT_APP_BACKURL + "/team/"); //route to request teams collection
                console.log("Response:" + response)

                const crd = await getPosition(); //get geoCoordinates
                const ID = dLoop(response.data, crd.coords); //get closet team ID

                const closest = response.data.find((team) => team.id === ID); //get team with the filtered id
                console.log(closest);
                setClosest(closest); //save the team to local variable

                if (closest.open) { //if team open to new players, add the coach name and info.
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
        return <div>Loading...</div>; //while the distance is calculated.
    }

    return (
        //return information saved previously
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

function getPosition() { //geolocation API. Returns GeoCoordinates.
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}
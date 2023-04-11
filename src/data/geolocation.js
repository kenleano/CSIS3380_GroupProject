import teamTable from "../data/teamTable.json";

function distance(latitude1, longitude1, latitude2, longitude2){

    var pi = Math.PI;

    var rad_lat1 = latitude1 * pi / 180;
    var rad_lat2 = latitude2 * pi / 180;
    var rad_lon1 = longitude1 * pi / 180;
    var rad_lon2 = longitude2 * pi / 180;

    var delta_latitude = rad_lat2 - rad_lat1;
    var delta_longitude = rad_lon2 / 180 - rad_lon1;

    var a = Math.pow(Math.sin(delta_latitude/2),2) +
    Math.cos(rad_lat1) * Math.cos(rad_lat2) *
    Math.pow(Math.sin(delta_longitude/2),2);

    return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 6378.137 * 1000;
}

function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

async function getDistances(){
    const crd = await getPosition();

    for(var team of teamTable){

        var lat1 = team.geotag[0];
        var lon1 = team.geotag[1];

        var dMin = 999999999999999;
        var d = distance(lat1, lon1, crd.latitude, crd.longitude);
        
        if (d<dMin){
            dMin = d;
            var closestTeamID = team.id; 
        }
    }
    return closestTeamID;
}
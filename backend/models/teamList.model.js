const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const teamSchema = new Schema({
  id:Number,
  teamName:String,
  description:String,
  location:String,
  days:String,
  geotag: [Schema.Types.Decimal128],
  logo:String,
  coachName: String,
  coachInfo: String,
  open: String,
  playersId:[Number]
});

// This Activitry creates the collection called teams
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;


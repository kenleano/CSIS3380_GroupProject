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
  geolat: Schema.Types.Decimal128,
  geolon: Schema.Types.Decimal128,
  logo:String,
  coachName:String,
  coachInfo: String,
  email: String,
  password: String,
  open: String
});

// This Activitry creates the collection called activitimodels
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;


const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const playerSchema = new Schema({
  id:Number,
  name:String,
  position:String,
  DOB:String,
  days:String,
  contact: String,
  injuries: String,
  active: Boolean,
  medical: String,
});

// This Activitry creates the collection called activitimodels
const Player = mongoose.model("Player", playerSchema);
module.exports = Player;


const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const playerSchema = new Schema({
  id:{ type: Number, required: true },
  name:{ type: String, required: true },
  position:{ type: String, required: true },
  DOB:{ type: String, required: true },
  days:{ type: String, required: true },
  contact: { type: String, required: true },
  injuries: { type: String, required: true },
  active: { type: Boolean, required: true },
  medical: { type: String, required: true },
});

// This Activitry creates the collection called activitimodels
const Player = mongoose.model("Player", playerSchema);
module.exports = Player;


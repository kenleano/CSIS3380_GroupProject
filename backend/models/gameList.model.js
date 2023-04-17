const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const gameSchema = new Schema({
  id:Number,
  id1:Number,
  id2:Number,
  date:String,
  datenumber:Number,
  location: String,
  result: String
});

// This Activitry creates the collection called games
const Game = mongoose.model("Game", gameSchema);
module.exports = Game;


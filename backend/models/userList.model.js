const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const userSchema = new Schema({
  id: Number,
  email: String,
  password: String,
  teamId: String
});

// This Activitry creates the collection called users
const User = mongoose.model("User", userSchema);
module.exports = User;


const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const userSchema = new Schema({
  id: Number,
  name: String,
  password: String
});

// This Activitry creates the collection called activitimodels
const User = mongoose.model("User", userSchema);
module.exports = User;


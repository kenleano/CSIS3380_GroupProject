const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const otkSchema = new Schema({
  id:Number  
});

// This Activitry creates the collection called activitimodels
const OTK = mongoose.model("OTK", otkSchema);
module.exports = OTK;


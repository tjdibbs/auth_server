const mongoose = require("mongoose");

// models
// import all your models here
const userModel = require("./userModel");

// if there already a model called Users use it else create a new model
exports.Users = mongoose.models["Users"] || mongoose.model("Users", userModel);

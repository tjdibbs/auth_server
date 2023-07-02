const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: String,
    email: {
      required: true,
      type: String,
    },
  },
  {
    collection: "Users",
    // to assert date field when new user is created
    timestamps: true,
  }
);

module.exports = userSchema;

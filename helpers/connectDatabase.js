const mongoose = require("mongoose");

module.exports = async function connectDatabase() {
  try {
    // get ur mongo_uri
    let MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI);

    console.log("Database connected");
  } catch (error) {
    console.error(error);

    // quit the server
    process.exit(1);
  }
};

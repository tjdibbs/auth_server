const express = require("express");
const router = require("./routes/router");

const app = express();

// configure middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// api
app.use("/api", router);

app.get("/test", (req, res) => res.send("it works"));

module.exports = app;

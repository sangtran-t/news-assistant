const express = require("express");
const mongoose = require("mongoose");
const app = express();

var database = require('./controllers/database.controller');

require("dotenv").config();

// Connect to mongodb
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .catch((error) => handleError(error));

mongoose.connection.once("open", () => console.log("Connect Database Successfully!"));

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

app.get("/", (req, res, next) => res.send("Backend MRC is running!"));

app.get("/articles", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    database.GetAllArticles(req, res);
});

app.get("/audio", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    database.GetAudio(req, res);
});

app.get("/contents", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    database.GetContents(req, res);
});

app.listen(process.env.PORT, () =>
  console.log(`Backend listening at http://localhost:${process.env.PORT}`)
);

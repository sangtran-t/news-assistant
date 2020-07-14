const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;

var database = require('./controllers/database.controller');

require("dotenv").config();

// Connect to mongodb
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .catch((error) => handleError(error));

mongoose.connection.once("open", () => console.log("Connect Database Successfully!"));



app.get("/", (req, res) => res.send("Sang!"));

app.get("/articles", (req, res) => {
    database.GetAllArticles(req, res);
});

app.get("/audio", (req, res) => {
    database.GetAudio(req, res);
});

app.get("/contents", (req, res) => {
    database.GetContents(req, res);
});

app.listen(port, () =>
  console.log(`Backend listening at http://localhost:${port}`)
);

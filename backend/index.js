const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors');

var database = require('./controllers/database.controller');

require("dotenv").config();

// Connect to mongodb
mongoose
  .connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .catch((error) => handleError(error));

mongoose.connection.once("open", () => console.log("Connect Database Successfully!"));

app.use(cors());

app.get("/", (req, res) => res.send("Backend MRC is running!"));

app.get("/articles", (req, res) => {
    database.GetAllArticles(req, res);
});

app.get("/audio", (req, res) => {
    database.GetAudio(req, res);
});

app.get("/contents", (req, res) => {
    database.GetContents(req, res);
});

app.get("/relevant", (req, res) => {
  database.GetRelevantContent(req, res);
})

app.listen(process.env.PORT, () =>
  console.log(`Backend listening at http://localhost:${process.env.PORT}`)
);

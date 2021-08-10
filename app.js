const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

const app = express();

// making sure we don't fuck up our database
if (process.env.ENV === "Test") {
  console.log("This is a test");
  const db = mongoose.connect("mongodb://localhost/bookAPI_Test");
} else {
  console.log("This is for reals!");
  const db = mongoose.connect("mongodb://localhost/bookAPI");
}

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API");
});

app.server = app.listen(port, () => {
  console.log("Running on the port ", port);
});

module.exports = app;

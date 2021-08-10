const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "",
    user: "postgres",
    password: "",
    database: "smartbrain",
  },
});

// controllers
const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const app = express();

//remember to parse json
app.use(express.json());
//adding cors middleware
app.use(cors());

app.get("/", (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((users) => {
      res.json(users);
    });
});

// option 1 of callback syntax
app.post("/signin", (req, res) => signin.handleSignin(req, res, knex, bcrypt));

// option 2
app.post("/register", register.handleRegister(knex, bcrypt));

app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, knex));

//we want to update entries count every time someone submits photo
app.put("/image", (req, res) => image.handleImagePut(req, res, knex));

//posting image to our clarifai api
app.post("/imageUrl", (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

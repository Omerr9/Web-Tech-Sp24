const express = require("express");
const mongoose = require("mongoose");
const Users = require("./Models/User");

const server = express();
const router = express.Router();

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(express.json());

server.get("/", (req, res) => {
  res.render("homepage");
});

server.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

server.get("/login", (req, res) => {
  res.render("login");
});

server.get("/contact-us", (req, res) => {
  res.render("contact-us");
});

server.get("/services", (req, res) => {
  res.render("services");
});

router.post("/sign-up", async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    phone_no: req.body.phone_no,
  };

  try {
    const record = new Users(data);
    await record.save();
    console.log("Record Saved with username: ", req.body.username);
    return res.send("Account Created Successfully!");
  } catch (error) {
    console.error("Error saving record:", error);
    return res.status(500).send("Error creating account");
  }
});

server.use("/", router);

const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/Project")
  .then(() => {
    console.log("DB Connected");
    server.listen(port, () => {
      console.log("Server listening on port " + port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

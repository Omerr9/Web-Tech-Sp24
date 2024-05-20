let express = require('express');
const mongoose = require("mongoose");
const { type } = require('os');
let router = express.Router();
let server = express();
const Users = require("./Models/User")
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(express.json());

server.get("/", (req, res) => {
    res.render("homepage");
})

server.get("/sign-up", (req, res) => {
    res.render("sign-up");
})

server.get("/login", (req, res) => {
    res.render("login");
})

server.get("/contact-us", (req, res) => {
    res.render("contact-us");
})

server.get("/services", (req, res) => {
    res.render("services");
})

mongoose.connect("mongodb://localhost:27017/Projects").then((data) => {
  console.log("DB Connected");
});

// router.post("/sign-up", async (req, res) => {
//     const data = {
//         username: req.body.username,
//         password: req.body.password,
//         name: req.body.name,
//         phone_no: req.body.phone_no
//     }
    
//     let record = new Users(data);

//     await record.save();
//     console.log("Record Saved with username: ", req.body.username);
//     return res.send("Account Created Sucessfully!")
// })

const usersApiRouter = require("./Routes/users");
server.use("/", usersApiRouter);
server.use("/", usersApiRouter);
server.use("/", usersApiRouter);

let port = 3000;

server.listen(port, () => {
    console.log("Server listening on port " + port);
});
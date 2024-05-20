// var fs = require('fs');
// var os = require('os');
// const note = require('./notes')
// var user = os.userInfo()
// var _ = require('lodash')
// // console.log(user.username);
// fs.appendFile("data.txt", "Hi " + user.username + "\n", () => console.log("data is created"))
// // console.log(note.data);
// console.log(note.sub(12, 13));
// const res = [1, 33, "abc", 1, 55, 34, "abc"]
// console.log(_.uniq(res));
// -----------------------------------------------------------
const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());// req.body
const port = process.env.PORT;

// Import the router files
const personRoutes = require("./routes/personRoute");
const menuItemRoutes = require("./routes/menuItemRoute");

//use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(port, () => {
      console.log("server listening on port 3000");
});




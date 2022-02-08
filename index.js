const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const db = require("./config/db");

require('dotenv').config();
const app = express();
const port = process.env.PORT;

// DATABASE CONFIG
db();

// FOR PUBLIC DIRECTORY
const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));

// FOR HANLE BARS
app.engine("hbs", hbs({ defaultLayout: "index", extname: ".hbs" }));
app.set("view engine", "hbs");

// MIDDLE WARES
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express-session
app.use(
  session({
    secret: "Super_Secret",
    resave: true,
    saveUninitialized: true,
  })
);

// connect flash
app.use(flash());

// global variables
app.use((req,res,next)=>{
  res.locals.successMsg=req.flash('successMsg');
  res.locals.error=req.flash('error');
  next();
})

// FOR ROUTES
app.use("/", require("./routes/pages"));

// FOR SERVER
app.listen(port, () => {
  console.log("server started on port : " + port);
});

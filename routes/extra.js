const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const geofencesmodel = require("../models/geofences");
const usersModel = require("../models/User");
const endUsersModel = require("../models/EndUser");
// const data = require("../data/data");
// const users = require("../data/users");

require("dotenv").config();

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_NAME,
    pass: process.env.MAIL_PASS,
  },
});

// IMPORTING MIDDLEWARES
const {
  ensureAuthenticated,
  ensureRedirect,
  logout,
} = require("../config/middlewares");

// ---------------------------------------------------------
// --------------------USER PANEL ROUTES--------------------
// ---------------------------------------------------------

// GET ROUTES

// --------------------INDEX ROUTE--------------------

router.get("/", ensureRedirect, (req, res) => {
  res.render("index/index.hbs", { data: "ola" });
});

// --------------------LOGIN ROUTE--------------------

router.get("/login", logout, (req, res) => {
  res.render("index/login.hbs");
});

// --------------------SIGNUP ROUTE--------------------

router.get("/signup", logout, (req, res) => {
  res.render("index/signup.hbs");
});

// --------------------PROPERTY DETAILS ROUTE--------------------

router.get("/property-details", (req, res) => {
  res.render("index/property-details.hbs");
});

// --------------------LOGOUT ROUTE--------------------

router.get("/logout", logout, (req, res) => {
  req.flash("success_msg", "you are logged out");
  res.redirect("/login");
});

// --------------------404 PAGE ROUTE--------------------
router.get("*", function (req, res) {
  res.status(404).render("index/404.hbs");
});

// POST ROUTES

// --------------------POST ENQUIRY ROUTE--------------------

router.post("/enquiry", [ensureRedirect, logout], (req, res) => {
  const { name, phone } = req.body;

  function generateOTP() {
    var digits = "0123456789";
    var otpLength = 6;
    var otp = "";
    for (let i = 1; i <= otpLength; i++) {
      var index = Math.floor(Math.random() * digits.length);
      otp = otp + digits[index];
    }
    return otp;
  }

  let otp = generateOTP();

  // Save the OTP code in DB
  const newEndUser = new endUsersModel({
    otp,
    name,
    phone,
  });
  newEndUser
    .save()
    .then((user) => {
      console.log(newEndUser);
    })
    .catch((err) => console.log(err));

  var mailOptions = {
    from: "officialsdesigns@gmail.com",
    to: "safflorant@gmail.com",
    subject: name + "' OTP code.",
    text: otp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  req.flash(
    "successMsg",
    "Please enter the verification code we sent you in the email"
  );

  res.redirect("/login");
});

// --------------------POST LOGIN ROUTE--------------------

router.post("/login", (req, res, next) => {
  const { phone, otp } = req.body;
  let errors = [];
  // Check Required Fields
  if (!phone || !otp) {
    errors.push({ msg: "please fill in all the fields" });
  }
  // Check OTP Length
  if (otp.length < 6) {
    errors.push({ msg: "OTP Must not be less than 6 Digits" });
  }
  if (errors.length > 0) {
    res.render("index/login.hbs", {
      errors,
      phone,
      otp,
    });
  } else {
    endUsersModel
      .findOne({ phone: phone })
      .then((user) => {
        if (user) {
          // Match OTPs
          if (otp != user.otp) {
            errors.push({ msg: "Incorrect OTP" });
            res.render("index/login.hbs", { errors, phone, otp });
          } else {
            endUsersModel
              .updateOne({ phone: phone }, { $set: { otp: false } })
              .then((results) => {
                console.log(results);
              })
              .catch((err) => console.log(err));
            req.session.user = phone;
            console.log(phone);
            res.redirect("/");
          }
        } else {
          errors.push({ msg: "Please Make an account first !" });
          res.render("index/login.hbs", { errors, phone, otp });
        }
      })
      .catch((err) => console.log(err));
  }
});

// --------------------POST SIGNUP ROUTE--------------------

router.post("/signup", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  // Check Required Fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "please fill in all the fields" });
  }
  // Check password Length
  if (password.length < 6 || password2.length < 6) {
    errors.push({ msg: "Password Must not be less than 6 characters" });
  }
  // Check Matching Passwords
  if (password != password2) {
    errors.push({ msg: "Passwords do not Match" });
  }
  if (errors.length > 0) {
    res.render("index/signup.hbs", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    usersModel
      .findOne({ email: email })
      .then((user) => {
        if (user) {
          // User Already Exists
          errors.push({ msg: "User Already Exists" });
          res.render("index/signup.hbs", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          // Register New User
          const id = Math.floor(Math.random() * 100000000000) + 1;
          const newUser = new usersModel({
            id,
            name,
            email,
            password,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  console.log(newUser);
                  req.flash(
                    "successMsg",
                    "Registered successfully, Now please Login !"
                  );
                  res.redirect("/login");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;

// ---------------------------------------------------------------------------------

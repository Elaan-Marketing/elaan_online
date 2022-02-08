const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const usersModel = require("../models/User");
const guestsModel = require("../models/Guest");

// IMPORTING MIDDLEWARES
const {
  ensureAuthenticated,
  ensureRedirect,
  logout,
} = require("../config/middlewares");

const {
  ensureSessionData,
  generateOTP,
  sendMailFunction,
  startSession,
} = require("../config/snippets");

// ---------------------------------------------------------
// --------------------USER PANEL ROUTES--------------------
// ---------------------------------------------------------

// GET ROUTES

// --------------------INDEX ROUTE--------------------

router.get("/", (req, res) => {
  ensureSessionData(req, res, "index/index.hbs");
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
  ensureSessionData(req, res, "index/property-details.hbs");
});

// --------------------LOGOUT ROUTE--------------------

router.get("/logout", logout, (req, res) => {
  req.flash("success_msg", "you are logged out");
  res.redirect("/login");
});

// --------------------GUEST LOGIN ROUTE--------------------

router.get("/guestlogin", (req, res) => {
  res.render("index/guest-login.hbs");
});

// --------------------GET RESEND OTP ROUTE--------------------
router.get("/resendotp", (req, res) => {
  const { phone, name } = req.query;
  console.log("ola");
  let otp = generateOTP();
  sendMailFunction(otp);
  guestsModel
    .updateOne({ phone: phone }, { $set: { otp } })
    .then((results) => {
      console.log(results);
    })
    .catch((err) => console.log(err));
  req.flash(
    "successMsg",
    "Please enter the verification code we sent you in the email"
  );
  res.render("index/guest-login-otp.hbs", { phone, name });
});

// --------------------404 PAGE ROUTE--------------------
router.get("*", function (req, res) {
  ensureSessionData(req, res, "index/404.hbs");
  // res.status(404).render();
});

// POST ROUTES

// --------------------POST GUEST LOGIN ROUTE--------------------

router.post("/guestlogin", (req, res) => {
  const { phone, name } = req.body;

  let errors = [];
  // Check Required Fields
  if (!phone && !name) {
    errors.push({ msg: "please enter a valid phone number" });
  }
  if (errors.length > 0) {
    res.render("index/login.hbs", {
      errors,
      phone,
      name,
    });
  } else {
    guestsModel
      .findOne({ phone: phone })
      .then((user) => {
        // Send OTP
        let otp = generateOTP();

        if (user) {
          // Update User in db
          guestsModel
            .updateOne({ phone: phone }, { $set: { otp } })
            .then((results) => {
              console.log(results);
            })
            .catch((err) => console.log(err));
        } else {
          // Save the user in db
          const newEndUser = new guestsModel({
            otp,
            phone,
            name,
          });
          newEndUser
            .save()
            .then((user) => {
              console.log(newEndUser);
            })
            .catch((err) => console.log(err));
        }
        sendMailFunction(otp);
        req.flash(
          "successMsg",
          "Please enter the verification code we sent you in the email"
        );
        res.render("index/guest-login-otp.hbs", { phone ,name});
      })
      .catch((err) => console.log(err));
  }
});

// --------------------POST GUEST LOGIN OTP ROUTE--------------------

router.post("/guestloginotp", (req, res) => {
  const { name, otp, phone } = req.body;

  let errors = [];
  // Check Required Fields
  if (!phone || !name || !otp) {
    errors.push({ msg: "Please fill in all the fields" });
  }
  if (otp.length < 6) {
    errors.push({ msg: "Incorrect OTP" });
  }
  if (errors.length > 0) {
    res.render("index/guest-login-otp.hbs", {
      errors,
      name,
      phone,
      otp,
    });
  } else {
    guestsModel
      .findOne({ phone: phone })
      .then((user) => {
        if (user) {
          // Match OTPs
          if (otp != user.otp) {
            errors.push({ msg: "Incorrect OTP" });
            res.render("index/guest-login-otp.hbs", {
              errors,
              phone,
              otp,
              name,
            });
          } else {
            guestsModel
              .updateOne({ phone: phone }, { $set: { otp: false } })
              .then((results) => {
                console.log(results);
              })
              .catch((err) => console.log(err));
            startSession(req, user);
            res.redirect("/");
          }
        } else {
          errors.push({ msg: "Incorrect phone number !" });
          res.render("index/guest-login-otp.hbs", { errors, phone, otp });
        }
      })
      .catch((err) => console.log(err));
  }
});

// --------------------POST LOGIN ROUTE--------------------

router.post("/login", (req, res) => {
  const { phone, password } = req.body;
  let errors = [];
  // Check Required Fields
  if (!phone || !password) {
    errors.push({ msg: "please fill in all the fields" });
  }
  // Check password Length
  if (password.length < 6) {
    errors.push({ msg: "password Must not be less than 6 Digits" });
  }
  if (errors.length > 0) {
    res.render("index/login.hbs", {
      errors,
      phone,
      password,
    });
  } else {
    usersModel
      .findOne({ phone: phone })
      .then((user) => {
        if (user) {
          if (user.status == "unverified") {
            let otp = generateOTP();
            sendMailFunction(otp);
            // Update User in db
            usersModel
              .updateOne({ phone: phone }, { $set: { otp } })
              .then((results) => {
                console.log(results);
              })
              .catch((err) => console.log(err));
            req.flash(
              "error",
              "Your Account is not verifed,\nPlease enter the password we sent you in the email"
            );
            res.render("index/login-otp.hbs", { phone });
          } else {
            startSession(req, user);
            res.redirect("/");
          }
        } else {
          errors.push({ msg: "Please Make an account first !" });
          res.render("index/login.hbs", { errors, phone, password });
        }
      })
      .catch((err) => console.log(err));
  }
});

// --------------------POST LOGIN OTP ROUTE--------------------

router.post("/loginotp", (req, res) => {
  const { otp, phone } = req.body;

  let errors = [];
  // Check Required Fields
  if (!otp) {
    errors.push({ msg: "Please enter an OTP code" });
  }
  if (otp.length < 6) {
    errors.push({ msg: "OTP cant not be less than 6 digits" });
  }
  if (errors.length > 0) {
    res.render("index/login-otp.hbs", {
      errors,
      phone,
      otp,
    });
  } else {
    usersModel
      .findOne({ phone: phone })
      .then((user) => {
        if (user) {
          // Match OTPs
          if (user.otp != otp) {
            errors.push({ msg: "Incorrect OTP" });
            res.render("index/login-otp.hbs", { errors, phone, otp });
          } else {
            usersModel
              .updateOne(
                { phone: phone },
                { $set: { otp: false, status: "verified" } }
              )
              .then((results) => {
                console.log(results);
              })
              .catch((err) => console.log(err));
            startSession(req, user);
            res.redirect("/");
          }
        }
      })
      .catch((err) => console.log(err));
  }
});

// --------------------POST SIGNUP ROUTE--------------------

router.post("/signup", (req, res) => {
  const { name, phone, password, password2 } = req.body;
  let errors = [];
  // Check Required Fields
  if (!name || !phone || !password || !password2) {
    errors.push({ msg: "please fill in all the fields" });
  }
  // Check password Length
  if (password.length < 6) {
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
      phone,
      password,
      password2,
    });
  } else {
    usersModel
      .findOne({ phone: phone })
      .then((user) => {
        if (user) {
          // User Already Exists
          errors.push({ msg: "User Already Exists Please Login" });
          res.render("index/signup.hbs", {
            errors,
            name,
            phone,
            password,
            password2,
          });
        } else {
          let otp = generateOTP();
          sendMailFunction(otp);
          // Register New User
          const id = Math.floor(Math.random() * 100000000000) + 1;
          const newUser = new usersModel({
            id,
            otp,
            name,
            phone,
            password,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    "successMsg",
                    "Please enter the verification code we sent you in the email"
                  );
                  res.render("index/login-otp.hbs", { phone });
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

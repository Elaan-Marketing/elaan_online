require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
  ensureSessionData: (req, res, route, data) => {
    if (!req.session.user) {
      return res.render(route);
    } else {
      const sessionData = req.session.user;
      return res.render(route, { sessionData, data });
    }
  },

  generateOTP: () => {
    var digits = "0123456789";
    var otpLength = 6;
    var otp = "";
    for (let i = 1; i <= otpLength; i++) {
      var index = Math.floor(Math.random() * digits.length);
      otp = otp + digits[index];
    }
    return otp;
  },

  startSession: (req,user) => {
    req.session.user = user;
    console.log(req.session.user,'this is user')
  },

  sendMailFunction: (otp) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_NAME,
        pass: process.env.MAIL_PASS,
      },
    });
    var mailOptions = {
      from: "officialsdesigns@gmail.com",
      to: "safflorant@gmail.com",
      subject: "OTP code.",
      text: otp,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

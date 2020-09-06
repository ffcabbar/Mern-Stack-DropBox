const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/form", (req, res) => {
  console.log(req.body);

  // Step 1
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Step 2
  let mailOptions = {
    from: "ffcabbar@gmail.com",
    to: req.body.email,
    subject: "Testing from FURKAN",
    text: req.body.message,
  };

  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Mail Hatası", err);
    } else {
      console.log("Email gönderildi");
    }
  });
});

module.exports = router;

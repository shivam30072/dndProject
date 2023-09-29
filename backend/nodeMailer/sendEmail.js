const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const createTransporter = require("../nodeMailer/transporter");

const sendEmail = async (type, email, userId) => {
  try {
    const emailTransporter = await createTransporter();
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (type === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        emailVerifyToken: hashedToken,
        emailVerifyTokenExpiry: Date.now() + 3600000,
      });
    }

    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verification Token",
      html: `<h1>Here is your sign up token, paste this while logging in</h1> <br> ${hashedToken}`,
    };

    const response = await emailTransporter.sendMail(message);
  } catch (err) {
    console.log("error in mail", err);
  }
};

module.exports = sendEmail;

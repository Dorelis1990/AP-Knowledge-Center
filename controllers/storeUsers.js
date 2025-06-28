const User = require("../models/Users");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "apknowledge.compass@gmail.com",
    pass: "pfnc ujlx eqxo nkmt", // It's better to use environment variables
  },
});

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.session.verifyMessage = "This email is already registered.";
      return res.redirect("/auth/register");
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      username,
      password,
      isVerified: false,
      verificationToken,
    });

    await newUser.save();

    const verificationUrl = `http://192.168.1.9:1800/verify/${verificationToken}`;

    await transporter.sendMail({
      from: '"Ap knowledge Center" <apknowledge.compass@gmail.com>',
      to: username,
      subject: "Verify your Ap knowledge Center account",
      html: `
        <h3>Verify Your Account</h3>
        <p>Click the link below to verify your email and activate your account:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    });

    req.session.verifyMessage = "Success! Please check your email to verify your account.";
    res.redirect("/auth/register");
  } catch (error) {
    console.error("Error registering user:", error);
    req.session.verifyMessage = "Registration failed. Please try again.";
    res.redirect("/auth/register");
  }
};

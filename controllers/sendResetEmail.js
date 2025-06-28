const crypto = require("crypto");
const User = require("../models/Users");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "apknowledge.compass@gmail.com",
    pass: "pfnc ujlx eqxo nkmt", // Use env vars in production!
  },
});

module.exports = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = resetToken;
    await user.save();

    const resetLink = `http://192.168.1.9:1800/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: '"Ap knowledge Center" <apknowledge.compass@gmail.com>',
      to: username,
      subject: "Reset your Ap knowledge Center password",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to set a new password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    return res.json({ success: true, message: "Password reset email sent!" });
  } catch (err) {
    console.error("Error sending reset email:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

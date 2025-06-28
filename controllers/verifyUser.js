const User = require("../models/Users");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      req.session.verifyMessage = "Invalid or expired verification link.";
      return res.redirect("/auth/register");
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    req.session.verifyMessage = "Your email has been verified! You can now log in.";
    res.redirect("/auth/register");
  } catch (err) {
    console.error("Verification error:", err);
    req.session.verifyMessage = "Something went wrong during verification.";
    res.redirect("/auth/register");
  }
};

const User = require("../models/Users");

module.exports = async (req, res) => {
  try {
    const token = req.params.token;

    // Find user by token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.render("resetPassword", {
        token,
        allowPasswordUpdate: false,
        verifyMessage: "❌ Invalid or expired reset link.",
      });
    }

    // Update the user's password
    user.password = req.body.password;
    user.verificationToken = null;

    await user.save();

    // Render the page with success message
    res.render("resetPassword", {
      token: null,
      allowPasswordUpdate: false,
      verifyMessage: "✅ Your password has been updated. You can now <a href='/auth/login'>log in</a>.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).render("resetPassword", {
      token: null,
      allowPasswordUpdate: false,
      verifyMessage: "⚠️ Server error. Please try again later.",
    });
  }
};

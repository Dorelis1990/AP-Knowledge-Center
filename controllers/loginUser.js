const bcrypt = require("bcrypt");
const User = require("../models/Users");

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Login attempt:", { username, password });

        const user = await User.findOne({ username });
        console.log("User found:", user);

        if (!user) {
            console.log("User not found");
            return res.redirect("/auth/login");
        }

        // Check if email is verified
        if (!user.isVerified) {
            console.log("❌ User has not verified their email:", username);
            return res.send("Please verify your email before logging in.");
        }

        const same = await bcrypt.compare(password, user.password);
        console.log("Password match:", same);

        if (same) {
            console.log("✅ User logged in. Session userId:", user._id);
            req.session.userId = user._id;
            return res.redirect("/");
        } else {
            console.log("Password incorrect");
            return res.redirect("/auth/login");
        }

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("Internal Server Error");
    }
};

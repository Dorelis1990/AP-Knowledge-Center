const User = require("../models/Users");

module.exports = async (req, res, next) => {
    console.log("🔍 Middleware: Session userId:", req.session.userId);

    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            console.log("🚫 User not found. Redirecting...");
            return res.redirect("/");
        }

        console.log("✅ User found:", user.username);
        next();
    } catch (error) {
        console.error("❌ Error in middleware:", error);
        return res.redirect("/");
    }
};

module.exports = async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
        res.redirect("/");
    } catch (error) {
        console.error("Error destroying session:", error);
        res.status(500).send("Logout failed.");
    }
};

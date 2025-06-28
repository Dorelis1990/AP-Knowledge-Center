module.exports = (req, res) => {
  if (req.session.userId) {
    console.log("✅ Reached newPostController");
    return res.render("create", { createPost: true });
  }
  res.redirect("/auth/login");
};

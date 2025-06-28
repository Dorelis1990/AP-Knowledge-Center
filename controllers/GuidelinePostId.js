const BlogPost = require("../models/blogPost");
const User = require("../models/Users");

module.exports = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate("user", "username");

    if (!blogPost) {
      return res.redirect("/");
    }

    const currentUser = req.session.userId
      ? await User.findById(req.session.userId)
      : null;

    res.render("post", {
      blogPost,
      user: currentUser,
      loggedIn: req.session.userId ? req.session.userId.toString() : null,
    });
  } catch (err) {
    console.error("Error loading post:", err);
    res.redirect("/");
  }
};

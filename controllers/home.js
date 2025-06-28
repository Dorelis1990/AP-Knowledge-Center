const BlogPost = require("../models/blogPost");
const User = require("../models/Users");
const QuizResult = require("../models/QuizResult");

module.exports = async (req, res) => {
  try {
    // Populate user field to access usernames
    const blogPosts = await BlogPost.find({})
      .populate("user", "username")
      .sort({ datePosted: -1 });

    const currentUserId = req.session.userId;
    const currentUser = currentUserId
      ? await User.findById(currentUserId)
      : null;

    let latestResult = null;

    if (currentUserId) {
      latestResult = await QuizResult.findOne({ user: currentUserId })
        .populate("user", "username")
        .sort({ createdAt: -1 });
    }

    res.render("index", {
      blogPost: blogPosts,
      user: currentUser,
      loggedIn: currentUserId ? currentUserId.toString() : null,
      latestResult 
    });
  } catch (err) {
    console.error("Error loading blog posts:", err);
    res.redirect("/");
  }
};

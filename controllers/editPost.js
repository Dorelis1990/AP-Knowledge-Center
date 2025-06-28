const BlogPost = require("../models/blogPost");
const User = require("../models/Users");

module.exports = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.redirect("/");
    }

    

    // Get the logged-in user document
    const user = await User.findById(req.session.userId);

    res.render("editPost", {
      post,
      user,                 
      loggedIn: req.session.userId ? req.session.userId.toString() : null,
      createPost: true     
    });
  } catch (err) {
    console.error("Error loading post for edit:", err);
    res.redirect("/");
  }
};

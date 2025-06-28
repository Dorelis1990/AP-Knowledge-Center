const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  try {
    await BlogPost.create({
      ...req.body,
      user: req.session.userId, 
    });
    res.redirect("/");
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).send("Error saving post.");
  }
};

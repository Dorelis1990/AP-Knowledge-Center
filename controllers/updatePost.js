const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.redirect("/");
    }

    // ✅ Allow any logged-in user to update the post
    post.title = req.body.title;
    post.body = req.body.body;

    await post.save();

    res.redirect(`/post/${post._id}`);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("Internal server error");
  }
};

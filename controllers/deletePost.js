const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    // ✅ Ownership check removed — any logged-in user can delete
    await BlogPost.findByIdAndDelete(req.params.id);

    res.redirect("/");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Internal server error");
  }
};

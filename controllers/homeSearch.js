const BlogPost = require("../models/blogPost");

module.exports = async (req, res) => {
  const query = req.query.query;

  try {
    const blogPost = await BlogPost.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, 
        { body: { $regex: query, $options: "i" } },
      ],
    }).populate("user", "username"); 

    res.render("index", { blogPost, query });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).send("Error searching posts");
  }
};

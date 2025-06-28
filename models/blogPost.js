const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BlogPostSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;

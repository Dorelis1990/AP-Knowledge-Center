const mongoose = require("mongoose");
const BlogPost = require("./models/blogPost");

async function run() {
  try {
    await mongoose.connect("mongodb://localhost/my_database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const blogpost = await BlogPost.create({
      title: "Latter & Blum",
      body: "Goes life on jun 1st 2025",
    });

    console.log("Blog post created:", blogpost);
  } catch (error) {
    console.error("Error creating blog post:", error);
  } finally {
    await mongoose.disconnect(); // Cleanly disconnect after operation
  }
}

run();

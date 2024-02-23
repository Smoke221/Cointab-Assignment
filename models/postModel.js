const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: Number,
  title: String,
  body: String,
  company: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };

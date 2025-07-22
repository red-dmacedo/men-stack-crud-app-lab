const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  created: Date,
  deleted: Date,
  comments: [{
    author: String,
    content: String,
    created: Date,
    deleted: Date,
  }],
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

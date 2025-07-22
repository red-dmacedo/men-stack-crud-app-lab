const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  comments: [{
    author: String,
    content: String,
    createdAt: Date,
  }],
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

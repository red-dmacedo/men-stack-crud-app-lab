const mongoose = require('mongoose');
const Post = require('./post.js');

const blogSchema = new mongoose.Schema({
  title:      {type: String, required: true},
  owner:      {type: String, required: true},
  created:    {type: Date, required: true},
  posts:      [Post], // array of posts
  nextPostId: {type: Number, required: true},
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

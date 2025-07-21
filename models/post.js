const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  owner:    {type: String, required: true},
  content:  {type: String, required: true},
  id:       {type: Number, required: true},
  created:  {type: Date, required: true},
  deleted:  {type: Date, required: false},
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

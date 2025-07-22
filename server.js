// Constants and Imports
const localPort = 3000;
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
const Post = require('./models/post.js');

dotenv.config();
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.get('/', (req,res) => {
  res.redirect('/home');
});

app.get('/home', (req,res) => {
  res.render('home.ejs');
});

app.get('/blogs', async (req,res) => {
  const posts = await Post.find({});
  res.render('blogs/blogs.ejs', { posts: posts });
});

app.post('/blogs', async (req,res) => {
  req.body.author = 'test-user';
  req.body.created = new Date();
  console.log(req.body);
  if(req.body.title && req.body.content) await Post.create(req.body);
  res.redirect('/blogs');
});

app.get('/blogs/new', (req,res) => {
  res.render('blogs/new.ejs');
});

app.get('/blogs/:id', async (req,res) => {
  const post = await Post.findById(req.params.id);
  res.render('blogs/show.ejs', { post: post });
});

app.delete('/blogs/:id', async (req,res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/blogs');
});

app.get('/blogs/:id/edit', async (req,res) => {
  const post = await Post.findById(req.params.id);
  res.render('blogs/edit.ejs', {post: post});
});

app.listen(localPort, () => {
  console.log(`Listening on port ${localPort}`);
});
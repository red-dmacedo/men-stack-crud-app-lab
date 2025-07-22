const localPort = 3000;
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require("morgan");
const path = require("path");
const Post = require('./models/post.js');

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
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

app.get('/blogs', (req,res) => {
  res.render('blogs/blogs.ejs');
});

app.post('/blogs/new', (req,res) => {
  res.render('blogs.ejs');
});

app.get('/blogs/:id',(req,res) => {
  res.send(`This is the route for: ${req.params.id}`);
});

app.listen(localPort, () => {
  console.log(`Listening on port ${localPort}`);
});
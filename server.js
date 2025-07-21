const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.get('/', (req,res) => {
  res.redirect('/home');
});

app.get('/home', (req,res) => {
  app.render('views/home.ejs');
});
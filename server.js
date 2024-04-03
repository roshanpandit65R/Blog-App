const express = require("express")
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const app = express()

const uri = 'mongodb://127.0.0.1:27017/Data';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
// useCreateIndex: true, 
};

mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.set("views", "./view")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)


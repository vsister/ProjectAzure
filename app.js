const express = require("express")
const path = require('path')
const publicPath = path.join(__dirname, '/public')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require("./passport")
const translate = require('./translator/translate')
const port = process.env.PORT || 8080
const Translation = require('./Translation')
const ans = require('./ansible')
const User = require('./User')
const app = express()
app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath))

app.use(
  session({
    secret: 'hghtyNN23hbd54dstkhj2342asdfa3689jhf',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  }
  else {
    return res.redirect('/login')
  }
}

let counter = 0

app.get('/',  (req,res)=>{
    res.render('index', {Counter: counter})
})

app.get('/login', (req,res) =>{
  res.render('login')
})

app.post('/inc', (req,res)=>{
    ++counter
    res.redirect('/')
})
app.post('/clear', (req,res)=>{
    counter = 0
    res.redirect('/')
})

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/logout', (req,res) => {
  req.logOut();
  res.redirect('/');
})

app.get('/create', (req,res)=>{
  ans.create(req.user.githubId)
  res.redirect('/')
})

app.get('/remove', (req,res)=>{
  ans.remove(req.user.githubId)
  res.redirect('/')
})

app.post('/translate', async (req,res) => {
  let translation = await Translation.create({original: req.body.to_translate, translated: "Производится перевод"})
  await User.findOneAndUpdate({githubId: req.user.githubId},{$push : {translations : translation._id}})
  await translate.do(translation._id, req.body.to_translate, req.body.lang1, req.body.lang2)
  res.redirect('/')
})

app.listen(port, ()=>{console.log('Listening ' + port)})
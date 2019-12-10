const express = require("express")
const path = require('path')
const publicPath = path.join(__dirname, '/public')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require("./passport")
const port = process.env.PORT || 8080

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

app.get('/', auth, (req,res)=>{
    res.render('index', {Counter: counter})
})

app.get('/login', (req,res) =>{
  res.render('index')
})

app.post('/inc', auth, (req,res)=>{
    ++counter
    res.redirect('/')
})
app.post('/clear', auth,(req,res)=>{
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

app.listen(port, ()=>{console.log('Слушаем порт ' + port)})
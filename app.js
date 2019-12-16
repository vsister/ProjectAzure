const express = require("express")
const path = require('path')
const publicPath = path.join(__dirname, '/public')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require("./passport")
const port = process.env.PORT || 8080
const ansible = require('./ansible')
const User = require('./User')
const Translation = require('./Translation')
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

const auth = function(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  }
  else {
    return res.redirect('/login')
  }
}

app.get('/',auth,  function(req,res) {
    res.render('index')
});

app.get('/auth/github',
  passport.authenticate('github')
  );

app.get('/login', function(req,res) {
  res.render('login')
});

app.get('/logout',auth, function(req,res) {
  req.logOut();
  res.redirect('/');
});

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.post('/translate',auth, async function(req,res) {
  let translation = await Translation.create({original: req.body.to_translate, translated: "Производится перевод"})
  await User.findOneAndUpdate({githubId: req.user.githubId},{$push : {translations : translation._id}})
  ansible.startVM(req.user.githubId,translation._id, req.body.lang1, req.body.lang2, req.body.to_translate)
  res.redirect('/')
});

app.listen(port, ()=>{console.log('Listening ' + port)})
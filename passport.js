const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;
const User =  require('./User') 
const ansible = require('./ansible')

passport.use(new GitHubStrategy({
    clientID: "d282c377c12a66b7f86d",
    clientSecret: "b658c25c83b3e15bd8a3979f104bcac7c9a33454",
    callbackURL: "https://projectgridcloud.azurewebsites.net/auth/github/callback"
  },
  function(accessToken, refreshToken, params, profile, done) {
    User.findOne({ githubId: profile.id }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        let user = User.create({githubId: profile.id})
        ansible.createRG(profile.id)
      } 
      return done(null, user);
    })
  }
));


passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user)
  done(null, user.githubId)
})

passport.deserializeUser(async function(id, done) {
  try{
    const user = await User.findOne({ githubId: id})
    if(!user) {
      return done(null, false)
    }
    else{
      return done(null, user)
    }
  }
  catch(err){
    return done(err)
  }
});

module.exports = passport
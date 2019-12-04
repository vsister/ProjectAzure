const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;
const User =  require('./db') 

passport.use(new GitHubStrategy({
    clientID: "d282c377c12a66b7f86d",
    clientSecret: "b658c25c83b3e15bd8a3979f104bcac7c9a33454",
    callbackURL: "https://projectgridcloud.azurewebsites.net/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport
/*const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const User = require("../models/User");

async function InitaliseGoogleLogin() {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "70066158066-ea8u4ot65lj1m73i13brakk4sbc4oh6t.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/login",
      },
      (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({
          where: { username: profile.exp },
          defaults: {
            username: profile.name,
            password: null,
            isStaff: 0,
            email: profile.exp,
            function(err, user) {
              return cb(err, user);
            },
          },
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    return done(null, await User.findByPk(id));
  });
}
  
module.exports = InitaliseGoogleLogin*/
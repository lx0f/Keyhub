const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../models');

require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const [user, created] = await User.findOrCreate({
        where: { email: profile.emails[0].value },
        defaults: {
          authMethod: 'oauth',
          email: profile.emails[0].value,
          isStaff: 0,
          password: null,
          username: profile.displayName,
        },
      });

      if (user.authMethod !== 'oauth') {
        return done(null, false, {
          message:
            'An account that is not yours has an account. Please contact an administrator to resolve this dispute.',
        });
      } else if (created) {
        return done(null, user, {
          message: 'You created your account! Welcome',
        });
      } else {
        if (user.disabled) {
          return done(null, false, {
            message: 'Your account has been disabled!',
          });
        }
        return done(null, user, { message: 'Welcome!' });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

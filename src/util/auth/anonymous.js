const AnonymousStrategy = require('passport-anonymous').Strategy;
const passport = require('passport');
passport.use(new AnonymousStrategy());

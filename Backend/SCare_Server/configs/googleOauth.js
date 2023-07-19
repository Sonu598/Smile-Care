const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: "http://localhost:2015/patient/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})
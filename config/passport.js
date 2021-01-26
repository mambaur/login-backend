const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../src/models/user')
const passport = require('passport')

passport.serializeUser((users, done)=>{done(null, users)})
passport.deserializeUser((users, done)=>{done(null, users)})

passport.use('local-login',new LocalStrategy(
    function(username, password, done) {
    //   User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false, {message: 'Incorrect username'}); }
    //     if (!user.verifyPassword(password)) { return done(null, false, {message: 'Incorrect password'}); }
    //     return done(null, user);
    //   })
        const users = User.find(user=>user.username === username)
        if(!users){return done(null, false, {message: 'Incorrect username'})}
        if(users.password !== password){return done(null, false, {message: 'Incorrect password'})}
        return done(null, users)
    }
))

passport.use(new GoogleStrategy({
    clientID: '570434686926-bqvjheks1bviadgg10l24k364b7gd9oj.apps.googleusercontent.com',
    clientSecret: 'ZFxeuA6EtQ-4wgB2kkyhwRn1',
    callbackURL: "https://login-third-party.herokuapp.com/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    cb(null, profile)
  }
));

passport.use(new FacebookStrategy({
    clientID: '4992344704170645',
    clientSecret: 'f7ac8fe649e41dd431ec33bd43d80b7e',
    callbackURL: "https://login-third-party.herokuapp.com/login/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile)
    cb(null, profile)
  }
));

module.exports = passport
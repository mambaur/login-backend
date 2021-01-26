const LocalStrategy = require('passport-local').Strategy
const User = require('../src/models/user')

function initialize(passport){
    passport.use(new LocalStrategy(
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

    passport.serializeUser((users, done)=>{done(null, users.id)})
    passport.deserializeUser((id, done)=>{
        const users = User.find(user=>user.id === id)
        return done(null, users)
    })
}

module.exports = initialize
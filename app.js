/**
* Module dependencies
*/
const 
    express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('express-flash'),
    methodOverride = require('method-override')

//===========================================================
/**
* Create instance App
*/
const app = express()
//===========================================================
/**
* Module variables
*/
require('./config/passport')
// require('./config/passport-google-oauth')(passport)
const 
    route = require('./src/routes/web'),
    port = process.env.PORT || 3000
//===========================================================
/**
* Middleware stacks
*/
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'shhhh, very secret'
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
//===========================================================
/**
* Config and settings
*/
app.set('views', './src/views')
app.set('view engine', 'ejs')
//===========================================================
/**
* Route
*/
app.use(route)

app.listen(port, ()=>console.log(`Listening on port ${port}`))
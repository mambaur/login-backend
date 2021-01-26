const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const port = process.env.PORT || 3000
const route = require('./src/routes/web')
const methodOverride = require('method-override')

require('./config/passport')(passport)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(methodOverride('_method'))

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'shhhh, very secret'
}))

app.use(passport.initialize())
app.use(passport.session())

// Cross Origin
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// Template Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Public folder
app.use(express.static('public'))

// Routes
app.use(route)

app.listen(port, ()=>console.log(`Listening on port ${port}`))
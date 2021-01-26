const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const port = process.env.PORT || 3000
const route = require('./src/routes/web')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(passport.initialize())
app.use(passport.session())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'shhhh, very secret'
}))

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
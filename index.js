const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const loginRoutes = require('./src/routes/login-route')

app.use(express.urlencoded({extended:false}))

// Template Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Public folder
app.use(express.static('public'))

// Routes
app.use('/auth', loginRoutes)

app.listen(port, ()=>console.log('Connected...'))
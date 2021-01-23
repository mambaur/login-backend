const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Routes
const loginRoutes = require('./src/routes/login')
app.use('/auth', loginRoutes)

// Template Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.listen(port, ()=>console.log('Connected...'))
const router = require('express').Router()
const loginController = require('../controllers/login')

// ROUTE -> Base
router.get('/', (req, res)=>res.send('Home Page'))

// Middleware AUTH
router.use((req, res, next)=>{
    console.log('hello iam auth middleware..')
    next()
})

// Route -> Login
router.get('/login', loginController.userCreate)
router.get('/register', (req, res)=>res.send('Register Page'))

module.exports = router
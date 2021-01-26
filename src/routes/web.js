const router = require('express').Router()
const authController = require('../controllers/auth')
const passport = require('passport')

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){return next()}
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){return res.redirect('/')}
    next()
}

// ROUTE -> Base
router.get('/', checkAuthenticated, (req, res)=>{
    res.render('welcome', {user: req.user})
})

// Route -> Login
router.get('/login', checkNotAuthenticated, authController.loginPage)
router.post('/login',passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true }))
    
// Route -> Register
router.get('/register', checkNotAuthenticated, authController.registerPage)
router.post('/register', authController.storeRegister)

// Route -> Logout
router.delete('/logout', (req, res)=>{
    req.logOut()
    res.redirect('/login')
})

module.exports = router
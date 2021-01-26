const router = require('express').Router()
const authController = require('../controllers/auth')
const passport = require('passport')


// ROUTE -> Middleware
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
    res.render('welcome', {name: req.user.displayName})
})

// ROUTE -> Login
router.get('/login', checkNotAuthenticated, authController.loginPage)
router.post('/login',passport.authenticate('local-login', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true }))
    
// ROUTE -> Register
router.get('/register', checkNotAuthenticated, authController.registerPage)
router.post('/register', authController.storeRegister)

// ROUTE -> Logout
router.delete('/logout', (req, res)=>{
    req.logOut()
    res.redirect('/login')
})

// ROUTE -> Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
});

// ROUTE -> Facebook OAuth
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

module.exports = router
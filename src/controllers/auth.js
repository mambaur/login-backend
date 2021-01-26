const users = require('../models/user')

exports.loginPage = (req, res)=>{
    res.render('auth/login')
}

exports.registerPage = (req, res)=>{
    res.render('auth/register')
}

exports.storeRegister = (req, res)=>{
    users.push({
        id: Date.now().toString(),
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.name
    })
    console.log(users)
    res.redirect('/login')
}
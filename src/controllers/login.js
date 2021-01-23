
exports.userCreate = (req, res, next)=>{
    res.render('login')
    next()
}

exports.userStore = (req, res, next)=>{
    res.send('Store Login')
    next()
}
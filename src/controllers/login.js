
exports.userCreate = (req, res, next)=>{
    console.log(process.env.KEY)
    res.render('login')
    next()
}

exports.userStore = (req, res, next)=>{
    res.send('Store Login')
    next()
}
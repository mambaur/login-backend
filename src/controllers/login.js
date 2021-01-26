const user = {
    "username" : "admin",
    "password" : "admin"
}

exports.userCreate = (req, res)=>{
    console.log(user)
    res.render('login')
}

exports.userStore = (req, res)=>{
    res.send('Store Login')
}
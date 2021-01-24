const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')

// CREATE -> GET
router.get('/login', loginController.userCreate)

// STORE -> POST
router.post('/login', loginController.userStore)

module.exports = router
const express = require('express')
const router = express.Router()

// Controller
const loginController = require('../controllers/login')

// CREATE -> GET
router.get('/login', loginController.userCreate)
router.post('/login', loginController.userStore)

module.exports = router
const router = require('express').Router()
const authController = require('../controller/authController')

router.all('/login', authController.login)
router.all('/signup', authController.signup)
router.get('/logout', authController.logout)


module.exports = router;
const router = require('express').Router()

router.use('/auth', require('./auth.router'))
router.use('/users', require('./user.router'))

module.exports = router
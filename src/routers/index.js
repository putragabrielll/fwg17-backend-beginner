const router = require('express').Router()

router.use('/auth', require('./auth.router'))
router.use('/users', require('./user.router'))
router.use('/products', require('./products.router'))

module.exports = router
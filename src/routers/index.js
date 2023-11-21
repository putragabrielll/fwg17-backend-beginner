const router = require('express').Router()

router.use('/auth', require('./auth.router'))
router.use('/users', require('./user.router'))
router.use('/products', require('./products.router'))
router.use('/promo', require('./promo.router'))
router.use('/product-size', require("./size.router"));

module.exports = router
const router = require('express').Router()

// End Point Auth
router.use('/auth', require('./auth.router'))

// End Point Database
router.use("/users", require('./user.router'))
router.use("/products", require('./products.router'))
router.use("/promo", require('./promo.router'))
router.use("/product-size", require("./size.router"))
router.use("/product-variant", require("./variant.router"))
router.use("/categories", require("./categories.router"))

module.exports = router
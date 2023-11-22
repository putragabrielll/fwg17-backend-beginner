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
router.use("/tags", require("./tags.router"))
router.use("/product-tags", require("./product-tags.router"))
router.use("/product-categories", require("./product-categories.router"))
router.use("/product-ratings", require("./product-ratings.router"))
router.use("/orders", require("./orders.router"))
router.use("/order-details", require("./order-details.router"))

module.exports = router
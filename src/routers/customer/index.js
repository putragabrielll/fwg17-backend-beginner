const customerRouter = require('express').Router()

// End Point Database
customerRouter.use('/profile', require('./profile.router'))
customerRouter.use('/orders', require('./orders.router'))
// customerRouter.use("/order-details", require("./order-details.router"))

module.exports = customerRouter

const customerRouter = require("express").Router()

// End Point Database
// customerRouter.use("/products", require("./products.router")) // tidak harus login untuk lihat products
customerRouter.use("/orders", require("./orders.router"))
// customerRouter.use("/order-details", require("./order-details.router"))

module.exports = customerRouter

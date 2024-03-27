const allOrders = require("express").Router()

const ordersController = require("../../controllers/customer/orders.controller")

allOrders.get("/details", ordersController.getOrdersByUserId)
allOrders.post("/", ordersController.createOrders)

module.exports = allOrders

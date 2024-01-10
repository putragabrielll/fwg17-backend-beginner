const allOrders = require("express").Router()

const ordersController = require("../../controllers/customer/orders.controller")

allOrders.get("/", ordersController.getOrdersByUserId)

module.exports = allOrders

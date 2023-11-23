const allOrders = require("express").Router();

const ordersController = require("../../controllers/admin/orders.controller");

allOrders.get("/", ordersController.getAllOrders);
allOrders.get("/:id", ordersController.getOrdersId);
allOrders.post("/", ordersController.createOrders);
allOrders.patch("/:id", ordersController.updateOrders);
allOrders.delete("/:id", ordersController.deleteOrders);

module.exports = allOrders;

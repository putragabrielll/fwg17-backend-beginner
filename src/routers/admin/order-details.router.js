const allOrderDetails = require("express").Router();

const orderdetailsController = require("../../controllers/admin/order-details.controller");

allOrderDetails.get("/", orderdetailsController.getAllOrderDetails);
allOrderDetails.get("/:id", orderdetailsController.getOrderDetailsId);
allOrderDetails.post("/", orderdetailsController.createOrderDetails);
allOrderDetails.patch("/:id", orderdetailsController.updateOrderDetails);
allOrderDetails.delete("/:id", orderdetailsController.deleteOrderDetails);

module.exports = allOrderDetails;

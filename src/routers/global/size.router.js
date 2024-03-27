const allSize = require("express").Router()

const sizeController = require("../../controllers/global/size.controller")

allSize.get("/", sizeController.getAllSize)
// allSize.get("/:id", sizeController.getSizeId)

module.exports = allSize

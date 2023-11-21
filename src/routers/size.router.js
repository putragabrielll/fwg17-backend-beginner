const allSize = require('express').Router()

const sizeController = require("../controllers/size.controller");

allSize.get("/", sizeController.getAllSize)
allSize.get("/:id", sizeController.getSizeId)
// allSize.post("/", sizeController.createPromo)
allSize.patch("/:id", sizeController.updateSize)
// allSize.delete("/:id", sizeController.deletePromo)

module.exports = allSize;
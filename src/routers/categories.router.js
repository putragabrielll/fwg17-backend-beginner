const allCategories = require("express").Router()

const categoriesController = require("../controllers/categories.controller")

allCategories.get("/", categoriesController.getAllCategories)
allCategories.get("/:id", categoriesController.getCategorieId)
allCategories.post("/", categoriesController.createCategories)
allCategories.patch("/:id", categoriesController.updateCategories)
allCategories.delete("/:id", categoriesController.deletecategories)

module.exports = allCategories

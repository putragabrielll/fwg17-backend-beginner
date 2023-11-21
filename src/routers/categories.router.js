const allCategories = require("express").Router()

const categoriesController = require("../controllers/categories.controller")

allCategories.get("/", categoriesController.getAllCategories)
allCategories.get("/:id", categoriesController.getCategoriesId)
allCategories.post("/", categoriesController.createCategories)
allCategories.patch("/:id", categoriesController.updateCategories)
allCategories.delete("/:id", categoriesController.deleteCategories)

module.exports = allCategories

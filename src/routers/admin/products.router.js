const allProducts = require("express").Router()


const productsController = require("../../controllers/admin/products.controller")

allProducts.get("/", productsController.getAllProducts)
allProducts.get("/by-categories", productsController.productByCategories)
allProducts.get("/:id", productsController.getProductsId)
allProducts.post("/",  productsController.createProducts)
allProducts.patch("/:id", productsController.updateProducts)
allProducts.delete("/:id", productsController.deleteProducts)

module.exports = allProducts 

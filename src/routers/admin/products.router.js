const allProducts = require("express").Router()


const productsController = require("../../controllers/admin/products.controller")
const uploadMiddlewaree = require("../../middlewares/upload.middleware")

allProducts.get("/", productsController.getAllProducts)
allProducts.get("/by-categories", productsController.productByCategories)
allProducts.get("/:id", productsController.getProductsId)
allProducts.post("/", uploadMiddlewaree("products").single('image'), productsController.createProducts)
allProducts.patch("/:id", uploadMiddlewaree("products").single('image'),productsController.updateProducts)
allProducts.delete("/:id", productsController.deleteProducts)

module.exports = allProducts 

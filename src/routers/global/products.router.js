const allProducts = require('express').Router()

const productsController = require('../../controllers/global/products.controller')

allProducts.get('/', productsController.getAllProducts)
allProducts.get('/:id', productsController.getProductsId)

module.exports = allProducts

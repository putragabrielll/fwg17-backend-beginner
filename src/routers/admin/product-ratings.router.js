const allProductRatings = require('express').Router()

const productratingsController = require('../../controllers/admin/product-ratings.controller')

allProductRatings.get('/', productratingsController.getAllProductRatings)
allProductRatings.get('/:id', productratingsController.getProductRatingsId)
allProductRatings.post('/', productratingsController.createProductRatings)
allProductRatings.patch('/:id', productratingsController.updateProductRatings)
allProductRatings.delete('/:id', productratingsController.deleteProductRatings)

module.exports = allProductRatings

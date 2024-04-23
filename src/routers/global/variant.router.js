const allVariant = require('express').Router()

const variantController = require('../../controllers/global/variant.controller')

allVariant.get('/', variantController.getAllVariant)
// allVariant.get("/:id", variantController.getVariantId)

module.exports = allVariant

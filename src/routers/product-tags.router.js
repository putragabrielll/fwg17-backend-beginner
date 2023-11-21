const allProductTags = require("express").Router()

const productstagsController = require("../controllers/product-tags.controller")

allProductTags.get("/", productstagsController.getAllProdutTags)
allProductTags.get("/:id", productstagsController.getProdutTagsId)
allProductTags.post("/", productstagsController.createProdutTags)
allProductTags.patch("/:id", productstagsController.updateProductTags)
allProductTags.delete("/:id", productstagsController.deleteProductTags);

module.exports = allProductTags

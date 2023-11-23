const allProductCategories = require("express").Router();

const productcategoriesController = require("../../controllers/admin/product-categories.controller");

allProductCategories.get(
  "/",
  productcategoriesController.getAllProductCategories
);
allProductCategories.get(
  "/:id",
  productcategoriesController.getProductCategoriesId
);
allProductCategories.post(
  "/",
  productcategoriesController.createProductCategories
);
allProductCategories.patch(
  "/:id",
  productcategoriesController.updateProductCategories
);
allProductCategories.delete(
  "/:id",
  productcategoriesController.deleteProductCategories
);

module.exports = allProductCategories;

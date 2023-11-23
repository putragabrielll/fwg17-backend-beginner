const allVariant = require("express").Router();

const variantController = require("../../controllers/admin/variant.controller");

allVariant.get("/", variantController.getAllVariant);
allVariant.get("/:id", variantController.getVariantId);
allVariant.post("/", variantController.createVariant);
allVariant.patch("/:id", variantController.updateVariant);
allVariant.delete("/:id", variantController.deleteVariant);

module.exports = allVariant;

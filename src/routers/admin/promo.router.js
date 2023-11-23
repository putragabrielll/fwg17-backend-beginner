const allPromo = require("express").Router();

const promoController = require("../../controllers/admin/promo.controller");

allPromo.get("/", promoController.getAllPromo);
allPromo.get("/:id", promoController.getPromoId);
allPromo.post("/", promoController.createPromo);
allPromo.patch("/:id", promoController.updatePromo);
allPromo.delete("/:id", promoController.deletePromo);

module.exports = allPromo;

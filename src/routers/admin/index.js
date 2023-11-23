const adminRouter = require("express").Router();

// End Point Database
adminRouter.use("/users", require("./user.router"));
adminRouter.use("/products", require("./products.router"));
adminRouter.use("/promo", require("./promo.router"));
adminRouter.use("/product-size", require("./size.router"));
adminRouter.use("/product-variant", require("./variant.router"));
adminRouter.use("/categories", require("./categories.router"));
adminRouter.use("/tags", require("./tags.router"));
adminRouter.use("/product-tags", require("./product-tags.router"));
adminRouter.use("/product-categories", require("./product-categories.router"));
adminRouter.use("/product-ratings", require("./product-ratings.router"));
adminRouter.use("/orders", require("./orders.router"));
adminRouter.use("/order-details", require("./order-details.router"));

module.exports = adminRouter;

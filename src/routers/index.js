const router = require("express").Router();

// End Point untuk cek Auth
router.use("/auth", require("./auth.router"));

// End Point untuk bisa akses end point yg lainnya / masuk ke end point admin
router.use("/admin", require("./admin/index"));

module.exports = router;
const router = require("express").Router()

const authMiddlewaree = require("../middlewares/auth.middleware")
const roleCheckMiddlewaree = require("../middlewares/roleCheck.middleware")

// End Point untuk cek Auth
router.use("/auth", require("./auth.router"))

// End Point untuk bisa akses end point yg lainnya / masuk ke end point admin
router.use("/admin", authMiddlewaree, roleCheckMiddlewaree('admin'), require("./admin/index"))

module.exports = router;
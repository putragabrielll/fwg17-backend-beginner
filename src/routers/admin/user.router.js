const allUsers = require("express").Router()

const userController = require("../../controllers/admin/user.controller")

const uploadMiddleware = require("../../middlewares/upload.middleware")

allUsers.get("/", userController.getAllUsers) // akan mengambil data semua user.
allUsers.get("/:id", userController.getUsersId) // akan mengambil data dari end point /users dengan menggunakan id.
allUsers.post("/", uploadMiddleware("users").single("picture"), userController.createUsers) // akan melakukan penambahan data baru.
allUsers.patch("/:id", uploadMiddleware("users").single("picture"), userController.updateUsers) // akan melakukan update data dengan berdasarkan id yg di kirimkan dari params.
allUsers.delete("/:id", userController.deleteUsers) // akan melakukan delete data berdasarkan id yg di kirimkan dari params.

module.exports = allUsers

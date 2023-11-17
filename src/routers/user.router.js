const allUsers = require('express').Router()

const userController = require('../controllers/user.controller')

allUsers.get('/', userController.getAllUsers) // akan mengambil data semua user.
allUsers.get("/:id", userController.getUsersId) // akan mengambil data dari end point /users dengan menggunakan id.
allUsers.post('/', userController.createUsers) // akan melakukan penambahan data baru.
allUsers.patch('/:id', userController.updateUsers) // akan melakukan update data dengan berdasarkan id yg di kirimkan dari params.
allUsers.delete('/:id', userController.deleteUsers) // akan melakukan delete data berdasarkan id yg di kirimkan dari params.

module.exports = allUsers
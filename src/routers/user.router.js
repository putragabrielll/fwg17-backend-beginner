const allUsers = require('express').Router()

const userController = require('../controllers/user.controller')

allUsers.get('/', userController.getAllUsers) // akan mengambil data semua user.
allUsers.get("/:id", userController.getUsersId); // akan mengambil data /users dengan menggunakan id.
allUsers.post('/', userController.createUsers) // akan melakukan penambahan data baru.

allUsers.delete('/', userController.deleteUsers)
allUsers.patch('/', userController.updateUsers);

module.exports = allUsers
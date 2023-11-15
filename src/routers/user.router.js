const allUsers = require('express').Router()

const userController = require('../controllers/user.controller')

allUsers.get('/', userController.getAllUsers)
allUsers.post('/', userController.createUsers)
allUsers.delete('/', userController.deleteUsers)

module.exports = allUsers
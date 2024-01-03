const Profile = require("express").Router()

const profileController = require("../../controllers/customer/profile.controller")

Profile.get("/", profileController.getProfile)
Profile.patch("/", profileController.updateProfile)

module.exports = Profile